namespace Idrissi.Blogging
{
    public class UserDetails
    {
        public string id { get; set; }
        public string userName { get; set; }
        public bool banned { get; set; }
        public long lastAttemptToPost { get; set; }
    }
}
