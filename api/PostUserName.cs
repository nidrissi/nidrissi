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

namespace Idrissi.Blogging
{
    public static class PostUserName
    {
        [FunctionName("PostUserName")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "user")]
            HttpRequest req,
            [CosmosDB(ConnectionStringSetting = "CosmosDbConnectionString")]
            DocumentClient client,
            ILogger log,
            CancellationToken token)
        {
            try
            {
                log.LogDebug("Parsing identity");
                var identity = Auth.Parse(req);

                if (!identity.IsInRole("authenticated"))
                {
                    log.LogWarning("Got a request from an unauthenticated user");
                    return new ForbidResult();
                }

                var userId = identity.FindFirst(ClaimTypes.NameIdentifier);

                if (String.IsNullOrWhiteSpace(userId.Value))
                {
                    log.LogError("Got a request from a user without a userId.");
                    return new ForbidResult();
                }

                log.LogDebug("Parsing body of the request");
                UserDetails details = await JsonSerializer.DeserializeAsync<UserDetails>(req.Body);
                if (details.id != userId.Value)
                {
                    log.LogError("Wrong user id.");
                    return new BadRequestObjectResult("Trying to set the username of the wrong user.");
                }
                if (details.userName.Length > 25 || details.userName.Length < 3)
                {
                    log.LogError("Wrong length: {username}", details.userName);
                    return new BadRequestObjectResult("Username must be between 3 and 25 characters.");
                }

                log.LogDebug("Setting username of {userId}", userId.Value);
                var collectionUri = UriFactory.CreateDocumentCollectionUri("Blogging", "Users");
                var partitionKey = new PartitionKey(userId.Value);
                var requestOptions = new RequestOptions() { PartitionKey = partitionKey };
                var response = await client.CreateDocumentAsync(collectionUri, details, requestOptions, cancellationToken: token);
                return new CreatedResult("user", details);
            }
            catch (JsonException e)
            {
                return new BadRequestObjectResult(e.Message);
            }
            catch (DocumentClientException e)
            {
                log.LogError(e.Message);
                switch (e.StatusCode)
                {
                    case HttpStatusCode.BadRequest:
                    case HttpStatusCode.RequestEntityTooLarge:
                        return new BadRequestResult();
                    case HttpStatusCode.Conflict:
                        return new ConflictResult();
                    default:
                        throw e;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
