namespace BlogApi
{
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

  public static class GetUsername
  {
    [FunctionName("GetUsername")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "user")] HttpRequest req,
        [CosmosDB(ConnectionStringSetting = "CosmosDbConnectionString")] DocumentClient client,
        ILogger log,
        CancellationToken token)
    {
      bool ok = Auth.ParseAndCheck(req, log, out var principal);
      if (!ok)
      {
        return new UnauthorizedResult();
      }

      var userId = principal.FindFirst(ClaimTypes.NameIdentifier).Value;
      try
      {
        log.LogInformation("Getting username of user={userId}.", userId);

        var userUri = UriFactory.CreateDocumentUri("Blogging", "Users", userId);
        var partitionKey = new PartitionKey(userId);
        var requestOptions = new RequestOptions()
        {
          PartitionKey = partitionKey,
        };
        UserDetails details = await client.ReadDocumentAsync<UserDetails>(userUri, requestOptions, token);

        log.LogInformation("Found name={Username}.", details.Username);
        if (details.Banned)
        {
          log.LogWarning("Rejecting request from banned user{userId}.", details.Id);
          return new UnauthorizedResult();
        }

        return new OkObjectResult(new { userId = details.Id, username = details.Username });
      }
      catch (DocumentClientException ex)
      {
        switch (ex.StatusCode.Value)
        {
          case HttpStatusCode.NotFound:
            log.LogInformation("No user with id {id}", userId);
            return new NotFoundResult();
          case HttpStatusCode.TooManyRequests:
            log.LogWarning("User {id} is making too many requests", userId);
            return new StatusCodeResult((int)HttpStatusCode.TooManyRequests);
          default:
            log.LogError(ex.Message);
            throw ex;
        }
      }
    }
  }
}
