namespace EV.Application.Categories.Queries
{
    public class GetCategoryPaginationQueryValidator : AbstractValidator<GetCategoryPaginationQuery>
    {
        public GetCategoryPaginationQueryValidator()
        {
            RuleFor(x => x.PageIndex)
              .GreaterThanOrEqualTo(1).WithMessage("PageIndex must be greater than or equal to 1.");
            RuleFor(x => x.PageSize)
              .GreaterThanOrEqualTo(1).WithMessage("PageSize must be greater than or equal to 1.");
            RuleFor(x => x.PageSize)
              .LessThanOrEqualTo(100).WithMessage("PageSize must be less than or equal to 100.");
            RuleFor(x => x.OrderBy)
                .Must(BeAValidOrderProperty)
                .When(x => !string.IsNullOrEmpty(x.OrderBy))
                .WithMessage("OrderBy must be empty or contain Id, Name, or Description.");
            RuleFor(x => x.FilterBy)
                .Must(BeAValidFilterProperty)
                .When(x => !string.IsNullOrEmpty(x.Search))
                .WithMessage("OrderBy must be empty or contain Name, or Description.");
        }

        private bool BeAValidOrderProperty(string propertyName)
        {
            var validProperties = new[] { "Id", "Name", "Description"};
            return validProperties.Contains(propertyName);
        }

        private bool BeAValidFilterProperty(string propertyName)
        {
            var validProperties = new[] { "Name", "Description" };
            return validProperties.Contains(propertyName);
        }
    }
}
