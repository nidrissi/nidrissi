namespace BlogApi
{
  using Newtonsoft.Json;

  public class UserDetails
  {
    [JsonProperty("id")]
    public string Id { get; set; }

    [JsonProperty("username")]
    public string Username { get; set; }

    [JsonProperty("banned")]
    public bool Banned { get; set; }

    [JsonProperty("lastAttemptToPost")]
    public long LastAttemptToPost { get; set; }
  }
}
