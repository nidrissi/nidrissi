using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace Idrissi.Blogging
{
    public static class GetComments
    {
        [FunctionName("GetComments")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "comment/{pageId}")]
            HttpRequest req,
            string pageId,
            [CosmosDB(ConnectionStringSetting = "CosmosDbConnectionString")]
            DocumentClient client,
            ILogger log)
        {
            if (string.IsNullOrWhiteSpace(pageId))
            {
                log.LogWarning("Empty request, aborting.");
                return new BadRequestResult();
            }

            log.LogInformation("Fetching comments for {pageId}", pageId);

            var commentsCollectionUri = UriFactory.CreateDocumentCollectionUri("Blogging", "Comments");

            var comments = from c in client.CreateDocumentQuery<Comment>(commentsCollectionUri)
                           where c.pageId == pageId
                           orderby c.date descending
                           select c;

            return new OkObjectResult(comments);
        }
    }
}
