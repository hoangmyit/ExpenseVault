namespace EV.Application.Common.Models
{
    public class RequestResult
    {
        public bool IsSucessed { get; set; }
        public string Message { get; set; }
        public RequestResult()
        {
            IsSucessed = true;
            Message = string.Empty;
        }

        public RequestResult(bool isSuccessed, string message)
        {
            IsSucessed = isSuccessed;
            Message = message;
        }
    }
}
