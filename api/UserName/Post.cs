namespace BlogApi
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

  public static class PostUsername
  {
    [FunctionName("PostUsername")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = "user")] HttpRequest req,
        [CosmosDB(ConnectionStringSetting = "CosmosDbConnectionString")] DocumentClient client,
        ILogger log,
        CancellationToken token)
    {
      try
      {
        ClaimsPrincipal principal = Auth.Parse(req);
        if (!Auth.Check(principal, log))
        {
          return new UnauthorizedResult();
        }

        string userId = principal.FindFirst(ClaimTypes.NameIdentifier).Value;

        log.LogDebug("Parsing body of the request");
        var details = await JsonSerializer.DeserializeAsync<UserDetails>(
          req.Body,
          new JsonSerializerOptions
          {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
          });
        if (details.Id != userId)
        {
          log.LogError("Wrong user id: request={userId1}, parsed={userId2}.", details.Id, userId);
          return new UnauthorizedResult();
        }

        if (details.Username.Length > 25 || details.Username.Length < 3)
        {
          log.LogError("Wrong length: {username}", details.Username);
          return new BadRequestResult();
        }

        log.LogDebug("Setting username of {userId}", userId);
        var collectionUri = UriFactory.CreateDocumentCollectionUri("Blogging", "Users");
        var response = await client.CreateDocumentAsync(
          collectionUri,
          details,
          new RequestOptions() { PartitionKey = new PartitionKey(userId) },
          cancellationToken: token);
        return new CreatedResult(details.Id, details);
      }
      catch (JsonException ex)
      {
        log.LogError("JSON error: {msg}", ex.Message);
        return new BadRequestResult();
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
