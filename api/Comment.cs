namespace Idrissi.Blogging
{
  public class Comment
  {
    public string Id { get; set; }

    public string PageId { get; set; }

    public long TimeStamp { get; set; }

    public string Content { get; set; }

    public string UserId { get; set; }

    public string UserName { get; set; }

    public bool Deleted { get; set; }
  }
}
