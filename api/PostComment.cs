namespace Idrissi.Blogging
{
  using System;
  using System.Net;
  using System.Security.Claims;
  using System.Text.Json;
  using System.Threading;
  using System.Threading.Tasks;
  using Microsoft.AspNetCore.Http;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.Azure.Documents;
  using Microsoft.Azure.Documents.Client;
  using Microsoft.Azure.WebJobs;
  using Microsoft.Azure.WebJobs.Extensions.Http;
  using Microsoft.Extensions.Logging;

  public static class PostComment
  {
    public static long ToJSTime(DateTime time)
    {
      return (long)(time - DateTime.UnixEpoch).TotalMilliseconds;
    }

    [FunctionName("PostComment")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "comment/{pageId}")] HttpRequest req,
        string pageId,
        [CosmosDB(ConnectionStringSetting = "CosmosDbConnectionString")] DocumentClient client,
        CancellationToken token,
        ILogger log)
    {
      try
      {
        if (!Pages.AllowedPageIds.TryGetValue(pageId, out var allowed) || !allowed)
        {
          log.LogWarning("Received a request to post on an unauthorized page: {pageId}.", pageId);
          return new UnauthorizedResult();
        }

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

        if (details.Banned)
        {
          log.LogWarning("Rejecting request from banned user {id}.", details.Id);
          return new UnauthorizedResult();
        }

        var lastTime = DateTimeOffset.FromUnixTimeMilliseconds(details.LastAttemptToPost).UtcDateTime;

        // convert to JS time
        details.LastAttemptToPost = ToJSTime(DateTime.UtcNow);

        log.LogInformation("Updating last attempt time for user {id}.", details.Id);
        await client.ReplaceDocumentAsync(userUri, details, userRequestOptions, token);

        if (lastTime.AddSeconds(10) > DateTime.UtcNow)
        {
          log.LogWarning("User {id} posting too much!", details.Id);
          return new StatusCodeResult((int)HttpStatusCode.TooManyRequests);
        }

        var body = await JsonSerializer.DeserializeAsync<PostCommentBody>(req.Body, null, token);
        string content = body.Content;

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
          PageId = pageId,
          Content = content,
          UserName = details.UserName,
          UserId = details.Id,
          TimeStamp = ToJSTime(DateTime.UtcNow),
        };

        var commentCollectionUri = UriFactory.CreateDocumentCollectionUri("Blogging", "Comments");
        var response = await client.CreateDocumentAsync(
            commentCollectionUri,
            comment,
            new RequestOptions { PartitionKey = new PartitionKey(pageId) },
            cancellationToken: token);
        log.LogInformation("Successfully posted comment {id}.", response.Resource.Id);

        return new CreatedResult(response.Resource.Id, response.Resource);
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

    public class PostCommentBody
    {
      public string Content { get; set; }
    }
  }
}
