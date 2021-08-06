using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Documents.Client;
using System.Threading;
using System.Security.Claims;
using System.Text.Json;
using Microsoft.Azure.Documents;
using System.Net;

namespace Idrissi.Blogging
{
    public static class PostComment
    {
        public class PostCommentBody
        {
            public string content { get; set; }
        }

        public static long ToJSTime(DateTime time)
        {
            return (long)(time - DateTime.UnixEpoch).TotalMilliseconds;
        }

        [FunctionName("PostComment")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "comment/{pageId}")]
            HttpRequest req,
            string pageId,
            [CosmosDB(ConnectionStringSetting = "CosmosDbConnectionString")]
            DocumentClient client,
            CancellationToken token,
            ILogger log)
        {
            try
            {
                ClaimsPrincipal principal;
                if (!Auth.TryParse(req, log, out principal))
                {
                    return new UnauthorizedResult();
                }

                var userId = principal.FindFirst(ClaimTypes.NameIdentifier).Value;

                log.LogInformation("Getting details of user {userId}...", userId);

                var userUri = UriFactory.CreateDocumentUri("Blogging", "Users", userId);
                var userRequestOptions = new RequestOptions() { PartitionKey = new PartitionKey(userId) };
                UserDetails details = await client.ReadDocumentAsync<UserDetails>(userUri, userRequestOptions, token);

                if (details.banned)
                {
                    log.LogWarning("Rejecting request from banned user {id}.", details.id);
                    return new UnauthorizedResult();
                }

                var lastTime = DateTimeOffset.FromUnixTimeMilliseconds(details.lastAttemptToPost).UtcDateTime;
                // convert to JS time
                details.lastAttemptToPost = ToJSTime(DateTime.UtcNow);

                log.LogInformation("Updating last attempt time for user {id}.", details.id);
                await client.ReplaceDocumentAsync(userUri, details, userRequestOptions, token);

                if (lastTime.AddSeconds(10) > DateTime.UtcNow)
                {
                    log.LogWarning("User {id} posting too much!", details.id);
                    return new StatusCodeResult((int)HttpStatusCode.TooManyRequests);
                }

                var body = await JsonSerializer.DeserializeAsync<PostCommentBody>(req.Body, null, token);
                string content = body.content;

                if (string.IsNullOrWhiteSpace(content))
                {
                    log.LogError("Empty post!");
                    return new BadRequestObjectResult("Empty post!");
                }
                if (content.Length < 10 || content.Length > 512)
                {
                    log.LogError("Incorrect post length: {l}.", content.Length);
                    return new BadRequestObjectResult("Post must be between 10 and 512 characters.");
                }

                var comment = new Comment()
                {
                    pageId = pageId,
                    content = content,
                    userName = details.userName,
                    userId = details.id,
                    timestamp = ToJSTime(DateTime.UtcNow)
                };

                var commentCollectionUri = UriFactory.CreateDocumentCollectionUri("Blogging", "Comments");
                var response = await client.CreateDocumentAsync(
                    commentCollectionUri,
                    comment,
                    new RequestOptions { PartitionKey = new PartitionKey(pageId) },
                    cancellationToken: token);
                log.LogInformation("Successfully posted comment {id}.", response.Resource.Id);

                return new CreatedResult(response.Resource.Id, comment);
            }
            catch (JsonException e)
            {
                log.LogError("JSON error: {msg}", e.Message);
                return new BadRequestObjectResult(e.Message);
            }
            catch (DocumentClientException ex)
            {
                log.LogError(ex.Message);
                switch (ex.StatusCode.Value)
                {
                    case HttpStatusCode.TooManyRequests:
                        return new StatusCodeResult((int)HttpStatusCode.TooManyRequests);
                    default:
                        throw ex;
                }
            }
        }
    }
}
