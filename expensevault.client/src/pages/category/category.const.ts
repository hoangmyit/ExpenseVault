import { CommonState, PaginatedList } from '../../model/common';
import { CategoryDto } from '../../model/common/backend-model';

export interface ICategoryState {
  categories: CommonState<PaginatedList<CategoryDto>>;
  category: CommonState<CategoryDto>;
}
