using FluentValidation.Validators;

namespace EV.Application.Common.Utilities.FluentValidation
{
    public class KeyValuePairValidator<T, TKey, TValue> : IPropertyValidator<T, KeyValuePair<TKey, TValue>>
    {
        private readonly IValidator<TValue> itemValidator;

        public string Name { get; set; } = "Item";

        public KeyValuePairValidator(IValidator<TValue> itemValidator)
        {
            this.itemValidator = itemValidator;
        }

        public string GetDefaultMessageTemplate(string errorCode)
        {
            return "This {PropertyName} is invalid.";
        }

        public bool IsValid(ValidationContext<T> context, KeyValuePair<TKey, TValue> item)
        {
            var results = itemValidator.Validate(item.Value);

            foreach (var failure in results.Errors)
            {
                context.AddFailure(failure.PropertyName, failure.ErrorMessage);
            }

            return results.IsValid;
        }
    }
}
