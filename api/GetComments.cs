namespace Idrissi.Blogging
{
  using System.Linq;
  using System.Security.Claims;
  using Microsoft.AspNetCore.Http;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.Azure.Documents.Client;
  using Microsoft.Azure.WebJobs;
  using Microsoft.Azure.WebJobs.Extensions.Http;
  using Microsoft.Extensions.Logging;

  public static class GetComments
  {
    [FunctionName("GetComments")]
    public static IActionResult Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "comment/{pageId}")] HttpRequest req,
        string pageId,
        [CosmosDB(ConnectionStringSetting = "CosmosDbConnectionString")] DocumentClient client,
        ILogger log)
    {
      if (string.IsNullOrWhiteSpace(pageId))
      {
        log.LogWarning("Empty request, aborting.");
        return new BadRequestResult();
      }

      log.LogInformation("Fetching comments for {pageId}...", pageId);

      var commentsCollectionUri = UriFactory.CreateDocumentCollectionUri("Blogging", "Comments");

      var query =
          from comment in client.CreateDocumentQuery<Comment>(commentsCollectionUri)
          where comment.PageId == pageId
          orderby comment.TimeStamp descending
          select comment;

      var comments = query.ToArray();
      log.LogInformation("Found {num} comments", comments.Count());

      ClaimsPrincipal principal = Auth.Parse(req);

      if (!principal.IsInRole("administrator"))
      {
        log.LogDebug("Removing deleted comments' contents.");
        foreach (var c in comments)
        {
          if (c.Deleted)
          {
            c.Content = null;
          }
        }
      }

      return new OkObjectResult(comments);
    }
  }
}
