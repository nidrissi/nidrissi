namespace Idrissi.Blogging
{
    public class Comment
    {
        public string id { get; set; }
        public string pageId { get; set; }
        public long timestamp { get; set; }
        public string content { get; set; }
        public string userId { get; set; }
        public string userName { get; set; }
        public bool deleted { get; set; }
    }
}
