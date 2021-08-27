
namespace BlogApi.Comment
{
  using System;
  using System.IO;
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

  public static class Patch
  {
    [FunctionName("Comment_PATCH")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "patch", Route = "comment/{pageId}/{commentId}")] HttpRequest req,
        string pageId,
        string commentId,
        [CosmosDB(ConnectionStringSetting = "CosmosDbConnectionString")] DocumentClient client,
        CancellationToken token,
        ILogger log)
    {
      try
      {
        if (!Pages.AllowedPageIds.TryGetValue(pageId, out var allowed) || !allowed)
        {
          log.LogError("Received a request to patch on an unauthorized page={pageId}.", pageId);
          return new UnauthorizedResult();
        }

        ClaimsPrincipal principal = Auth.Parse(req);
        if (!Auth.Check(principal, out var authMsg))
        {
          log.LogWarning(authMsg);
          return new UnauthorizedResult();
        }

        var body = await JsonSerializer.DeserializeAsync<PartialComment>(
          req.Body,
           new JsonSerializerOptions
           {
             PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
           },
           token);

        if (!body.TrimAndCheck(out var trimMsg))
        {
          log.LogWarning(trimMsg);
          return new BadRequestResult();
        }

        string content = body.Content;

        // TODO: extract a method or something
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

        DateTime lastTime = Util.FromJSTime(details.LastAttemptToPost);

        long jsNow = Util.ToJSTime(DateTime.UtcNow);
        details.LastAttemptToPost = jsNow;
        log.LogInformation("Updating lastAttemptToPost for user={userId}.", details.Id);
        await client.ReplaceDocumentAsync(userUri, details, userRequestOptions, token);

        if (DateTime.Now - lastTime < TimeSpan.FromSeconds(10))
        {
          log.LogWarning("User={userId} posting too much!", details.Id);
          return new StatusCodeResult((int)HttpStatusCode.TooManyRequests);
        }

        var commentUri = UriFactory.CreateDocumentUri("Blogging", "Comments", commentId);
        var commentRequestOptions = new RequestOptions() { PartitionKey = new PartitionKey(pageId) };
        Comment comment = await client.ReadDocumentAsync<Comment>(commentUri, commentRequestOptions, token);
        log.LogInformation("Found comment={commentId}", comment.Id);

        if (comment.UserId != userId)
        {
          log.LogError("User={userId} trying to edit comment={commentId} that belongs to user={otherUserId}.", userId, comment.Id, comment.UserId);
          return new UnauthorizedResult();
        }

        DateTime lastEdit = Util.FromJSTime(comment.LastEditTimestamp ?? 0);

        if (DateTime.Now - lastEdit < TimeSpan.FromSeconds(10))
        {
          log.LogWarning("User={userId} editing too much.", details.Id);
          return new StatusCodeResult((int)HttpStatusCode.TooManyRequests);
        }

        if (DateTime.Now - lastEdit > TimeSpan.FromMinutes(5))
        {
          log.LogWarning("Comment too old to be edited.", details.Id);
          return new UnauthorizedResult();
        }

        comment.Content = content;
        comment.LastEditTimestamp = jsNow;

        var response = await client.ReplaceDocumentAsync(commentUri, comment, commentRequestOptions, token);

        return new EmptyResult();
      }
      catch (JsonException ex)
      {
        log.LogError("JSON error:\n{msg}", ex.Message);
        return new BadRequestObjectResult(ex.Message);
      }
      catch (DocumentClientException ex)
      {
        log.LogError("Cosmos error:\n{msg}", ex.Message);
        switch (ex.StatusCode.Value)
        {
          case HttpStatusCode.NotFound:
            return new StatusCodeResult((int)HttpStatusCode.NotFound);
          case HttpStatusCode.TooManyRequests:
            return new StatusCodeResult((int)HttpStatusCode.TooManyRequests);
          default:
            throw ex;
        }
      }

    }
  }
}
