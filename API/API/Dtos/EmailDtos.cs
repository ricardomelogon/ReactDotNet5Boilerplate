using API.Data.Entities;

namespace API.Dtos
{
    public class EmailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Subject { get; set; }
    }

    public class EmailEditDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }

    public class EmailConfigDto
    {
        public EmailConfigItemDto Receiver { get; set; }
        public EmailConfigItemDto Sender { get; set; }
        public object Port { get; internal set; }
    }

    public class EmailConfigItemDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool EnableSsl { get; set; }
    }
}