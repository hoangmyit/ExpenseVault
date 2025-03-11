
using FluentValidation.Results;

namespace EV.Application.Common.Exceptions
{
    public class CustomValidationException : Exception
    {
        public IDictionary<string, string[]> Errors { get; }
        public CustomValidationException(): base("One or more validation failures have occurred.")
        {
            Errors = new Dictionary<string, string[]>();
        }

        public CustomValidationException(IEnumerable<ValidationFailure> failures)
        {
            Errors = failures
                .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
                .OrderBy(e => e.Key)
                .ToDictionary(failureGroup => failureGroup.Key, failureGroup => failureGroup.ToArray());
        }

        public CustomValidationException(string key, string message): this()
        {
            Errors.Add(key, new string[] { message });
        }
    }
}
