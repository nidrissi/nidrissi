namespace BlogApi
{
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Security.Claims;
  using System.Text;
  using System.Text.Json;
  using Microsoft.AspNetCore.Http;
  using Microsoft.Extensions.Logging;

  // https://docs.microsoft.com/en-us/azure/static-web-apps/user-information?tabs=csharp
  public static class Auth
  {
    public class ClientPrincipal
    {
      public string IdentityProvider { get; set; }

      public string UserId { get; set; }

      public string UserDetails { get; set; }

      public IEnumerable<string> UserRoles { get; set; }
    }

    public static ClaimsPrincipal Parse(HttpRequest req)
    {
      var principal = new ClientPrincipal();

      if (req.Headers.TryGetValue("x-ms-client-principal", out var header))
      {
        var data = header[0];
        var decoded = Convert.FromBase64String(data);
        var json = Encoding.ASCII.GetString(decoded);
        principal = JsonSerializer.Deserialize<ClientPrincipal>(
          json,
          new JsonSerializerOptions
          {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
          });
      }

      principal.UserRoles = principal.UserRoles?.Except(new string[] { "anonymous" }, StringComparer.CurrentCultureIgnoreCase);

      if (!principal.UserRoles?.Any() ?? true)
      {
        return new ClaimsPrincipal();
      }

      var identity = new ClaimsIdentity(principal.IdentityProvider);
      identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, principal.UserId));
      identity.AddClaim(new Claim(ClaimTypes.Name, principal.UserDetails));
      identity.AddClaims(from r in principal.UserRoles select new Claim(ClaimTypes.Role, r));

      return new ClaimsPrincipal(identity);
    }

    public static bool Check(ClaimsPrincipal identity, ILogger log)
    {
      if (!identity.IsInRole("authenticated"))
      {
        log.LogWarning("Got a request from an unauthenticated user.");
        return false;
      }

      var userId = identity.FindFirst(ClaimTypes.NameIdentifier);

      if (string.IsNullOrWhiteSpace(userId.Value))
      {
        log.LogError("Got a request from a user without a userId.");
        return false;
      }

      return true;
    }

    public static ClaimsIdentity Parse(UserDetails details)
    {
      var identity = new ClaimsIdentity("idrissi.eu");
      identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, details.Id));
      identity.AddClaim(new Claim(ClaimTypes.Name, details.Username));
      if (details.Banned)
      {
        identity.AddClaim(new Claim("Banned", "true"));
      }
      return identity;
    }
  }
}
