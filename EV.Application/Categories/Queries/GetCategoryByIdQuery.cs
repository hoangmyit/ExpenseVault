﻿namespace EV.Application.Categories.Queries
{
  public record GetCategoryByIdQuery(int Id) : IRequest<CategoryDto>;
}
