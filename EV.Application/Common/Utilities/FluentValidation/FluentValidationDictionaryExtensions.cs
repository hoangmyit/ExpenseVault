namespace EV.Application.Common.Utilities.FluentValidation
{
    public static class FluentValidationDictionaryExtensions
    {
        public static IRuleBuilderOptions<T, KeyValuePair<TKey, TValue>> SetDictionaryItemValidator<T, TKey, TValue>(this IRuleBuilderInitialCollection<T, KeyValuePair<TKey, TValue>> ruleBuilder, IValidator<TValue> itemValidator)
        {
            return ruleBuilder.OverrideIndexer((model, items, currentItem, index) => "." + currentItem.Key)
                              .SetValidator(new KeyValuePairValidator<T, TKey, TValue>(itemValidator));
        }
    }
}
