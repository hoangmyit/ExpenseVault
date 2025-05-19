namespace EV.Application.Common.Models
{
    public class RequestResult
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public string MessageKey { get; set; }
        public List<string>? MessageParams { get; set; }
        public RequestResult()
        {
            IsSuccess = true;
            Message = string.Empty;
            MessageKey = string.Empty;
        }

        public RequestResult(bool isSuccessed, string message, string messageKey, List<string>? messageParams)
        {
            IsSuccess = isSuccessed;
            Message = message;
            MessageKey = messageKey;
            MessageParams = messageParams;
        }
    }
}
