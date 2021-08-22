namespace BlogApi
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
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = "comment/{pageId}")] HttpRequest req,
        string pageId,
        [CosmosDB(ConnectionStringSetting = "CosmosDbConnectionString")] DocumentClient client,
        CancellationToken token,
        ILogger log)
    {
      try
      {
        if (!Pages.AllowedPageIds.TryGetValue(pageId, out var allowed) || !allowed)
        {
          log.LogError("Received a request to post on an unauthorized page: {pageId}.", pageId);
          return new UnauthorizedResult();
        }

        var body = await JsonSerializer.DeserializeAsync<PostCommentBody>(
          req.Body,
           new JsonSerializerOptions
           {
             PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
           },
           token);
        string content = body.Content;
        string trimmedContent = content.Trim();

        if (string.IsNullOrWhiteSpace(trimmedContent))
        {
          log.LogError("Empty post.");
          return new BadRequestResult();
        }
        else if (trimmedContent.Length < 10 || trimmedContent.Length > 512)
        {
          log.LogError("Incorrect post length: {l}.", trimmedContent.Length);
          return new BadRequestResult();
        }

        ClaimsPrincipal principal = Auth.Parse(req);
        if (!Auth.Check(principal, log))
        {
          return new UnauthorizedResult();
        }

        var userId = principal.FindFirst(ClaimTypes.NameIdentifier).Value;

        log.LogInformation("Getting details of user={userId}.", userId);

        var userUri = UriFactory.CreateDocumentUri("Blogging", "Users", userId);
        var userRequestOptions = new RequestOptions() { PartitionKey = new PartitionKey(userId) };
        UserDetails details = await client.ReadDocumentAsync<UserDetails>(userUri, userRequestOptions, token);
        principal.AddIdentity(Auth.Parse(details));

        if (principal.HasClaim("banned", "true"))
        {
          log.LogError("Rejecting request from banned user={userId}.", details.Id);
          return new UnauthorizedResult();
        }

        var lastTime = DateTimeOffset.FromUnixTimeMilliseconds(details.LastAttemptToPost).UtcDateTime;
        long jsNow = ToJSTime(DateTime.UtcNow);
        details.LastAttemptToPost = jsNow;

        log.LogInformation("Updating lastAttemptToPost for user={userId}.", details.Id);
        await client.ReplaceDocumentAsync(userUri, details, userRequestOptions, token);

        if (lastTime.AddSeconds(10) > DateTime.UtcNow)
        {
          log.LogWarning("User={userId} posting too much!", details.Id);
          return new StatusCodeResult((int)HttpStatusCode.TooManyRequests);
        }

        var comment = new Comment()
        {
          PageId = pageId,
          Content = trimmedContent,
          Username = details.Username,
          UserId = userId,
          Timestamp = jsNow,
        };

        var commentCollectionUri = UriFactory.CreateDocumentCollectionUri("Blogging", "Comments");
        var response = await client.CreateDocumentAsync(
            commentCollectionUri,
            comment,
            new RequestOptions { PartitionKey = new PartitionKey(pageId) },
            cancellationToken: token);
        log.LogInformation("Successfully posted comment{commentId}.", response.Resource.Id);

        return new CreatedResult(response.Resource.Id, response.Resource);
      }
      catch (JsonException ex)
      {
        log.LogError("JSON error: {msg}.", ex.Message);
        return new BadRequestObjectResult(ex.Message);
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
