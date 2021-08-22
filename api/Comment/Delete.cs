namespace BlogApi
{
  using System.Linq;
  using System.Net;
  using System.Security.Claims;
  using System.Threading;
  using System.Threading.Tasks;
  using Microsoft.AspNetCore.Http;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.Azure.Documents;
  using Microsoft.Azure.Documents.Client;
  using Microsoft.Azure.WebJobs;
  using Microsoft.Azure.WebJobs.Extensions.Http;
  using Microsoft.Extensions.Logging;

  public static class DeleteComment
  {
    [FunctionName("DeleteComment")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "delete", Route = "comment/{pageId}/{commentId}")] HttpRequest req,
        string pageId,
        string commentId,
        [CosmosDB(ConnectionStringSetting = "CosmosDbConnectionString")] DocumentClient client,
        CancellationToken token,
        ILogger log)
    {
      try
      {
        ClaimsPrincipal principal = Auth.Parse(req);
        if (!Auth.Check(principal, log))
        {
          return new UnauthorizedResult();
        }

        var userId = principal.FindFirst(ClaimTypes.NameIdentifier).Value;
        log.LogInformation("Request to delete {commentId} from {userId}.", commentId, userId);

        var commentUri = UriFactory.CreateDocumentUri("Blogging", "Comments", commentId);

        if (req.Query.TryGetValue("super", out var values) && values.Any(s => s == "1"))
        {
          if (principal.IsInRole("administrator"))
          {
            RequestOptions requestOptions = new RequestOptions
            {
              PartitionKey = new PartitionKey(pageId),
            };
            log.LogWarning("Administrator erasure of comment {commentId}", commentId);
            await client.DeleteDocumentAsync(commentUri, requestOptions, token);
            return new OkResult();
          }
          else
          {
            return new UnauthorizedResult();
          }
        }
        else
        {
          RequestOptions requestOptions = new RequestOptions
          {
            PartitionKey = new PartitionKey(pageId),
          };

          var response = await client.ReadDocumentAsync<Comment>(commentUri, requestOptions, token);
          var comment = response.Document;
          if (comment.UserId != userId)
          {
            return new UnauthorizedResult();
          }

          comment.Deleted = true;

          await client.ReplaceDocumentAsync(
              commentUri,
              comment,
              requestOptions,
              token);

          return new OkResult();
        }
      }
      catch (DocumentClientException ex)
      {
        log.LogError(ex.Message);
        switch (ex.StatusCode.Value)
        {
          case HttpStatusCode.NotFound:
            return new NotFoundResult();
          case HttpStatusCode.TooManyRequests:
            return new StatusCodeResult((int)HttpStatusCode.TooManyRequests);
          default:
            throw ex;
        }
      }
    }
  }
}
