import {
  CategoryDetailDto,
  CategoryDto,
} from '@/shared/types/backend/category';
import { CommonState, PaginatedList, SearchState } from '@/shared/types/common';

export interface ICategoryState {
  categories: CommonState<PaginatedList<CategoryDto>>;
  category: CommonState<CategoryDetailDto>;
  searchParams: SearchState<CategoryDto>;
}
