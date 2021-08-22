namespace Idrissi.Blogging
{
  using System;
  using System.Net;
  using System.Threading;
  using System.Threading.Tasks;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.Azure.WebJobs;
  using Microsoft.Azure.WebJobs.Extensions.Http;
  using Microsoft.AspNetCore.Http;
  using Microsoft.Extensions.Logging;
  using System.Security.Claims;
  using System.Text.Json;
  using Microsoft.Azure.Documents;
  using Microsoft.Azure.Documents.Client;

  public static class PostUserName
  {
    [FunctionName("PostUserName")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = "user")] HttpRequest req,
        [CosmosDB(ConnectionStringSetting = "CosmosDbConnectionString")] DocumentClient client,
        ILogger log,
        CancellationToken token)
    {
      try
      {
        ClaimsPrincipal principal;
        if (!Auth.TryParse(req, log, out principal))
        {
          return new UnauthorizedResult();
        }

        var userId = principal.FindFirst(ClaimTypes.NameIdentifier);

        log.LogDebug("Parsing body of the request");
        UserDetails details = await JsonSerializer.DeserializeAsync<UserDetails>(
          req.Body,
          new JsonSerializerOptions
          {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
          });
        if (details.Id != userId.Value)
        {
          log.LogError("Wrong user id.");
          return new BadRequestObjectResult("Trying to set the username of the wrong user.");
        }

        if (details.UserName.Length > 25 || details.UserName.Length < 3)
        {
          log.LogError("Wrong length: {username}", details.UserName);
          return new BadRequestObjectResult("Username must be between 3 and 25 characters.");
        }

        log.LogDebug("Setting username of {userId}", userId.Value);
        var collectionUri = UriFactory.CreateDocumentCollectionUri("Blogging", "Users");
        var response = await client.CreateDocumentAsync(
          collectionUri,
          details,
          new RequestOptions() { PartitionKey = new PartitionKey(userId.Value) },
          cancellationToken: token);
        return new CreatedResult(details.Id, details);
      }
      catch (JsonException ex)
      {
        log.LogError("JSON error: {msg}", ex.Message);
        return new BadRequestObjectResult(ex.Message);
      }
      catch (DocumentClientException ex)
      {
        log.LogError("Client error: {msg}", ex.Message);
        switch (ex.StatusCode)
        {
          case HttpStatusCode.BadRequest:
          case HttpStatusCode.RequestEntityTooLarge:
            return new BadRequestResult();
          case HttpStatusCode.Conflict:
            return new ConflictResult();
          default:
            throw ex;
        }
      }
      catch (Exception e)
      {
        throw e;
      }
    }
  }
}
