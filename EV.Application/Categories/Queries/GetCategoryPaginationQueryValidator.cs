namespace EV.Application.Categories.Queries
{
  public class GetCategoryPaginationQueryValidator : AbstractValidator<GetCategoryPaginationQuery>
  {
    public GetCategoryPaginationQueryValidator()
    {
      RuleFor(x => x.PageIndex)
        .LessThanOrEqualTo(1).WithMessage("PageIndex must be greater than or equal to 1.");
      RuleFor(x => x.PageSize)
        .GreaterThanOrEqualTo(1).WithMessage("PageSize must be greater than or equal to 1.");
    }
  }
}
