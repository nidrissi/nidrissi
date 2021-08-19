namespace Idrissi.Blogging
{
  public class UserDetails
  {
    public string Id { get; set; }

    public string UserName { get; set; }

    public bool Banned { get; set; }

    public long LastAttemptToPost { get; set; }
  }
}
