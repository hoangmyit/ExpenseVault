import { CommonState, PaginatedList, SearchState } from '@/shared/types/common';
import { CategoryDto } from '@/shared/types/backend/category';

export interface ICategoryState {
  categories: CommonState<PaginatedList<CategoryDto>>;
  category: CommonState<CategoryDto>;
  searchParams: SearchState<CategoryDto>;
}
