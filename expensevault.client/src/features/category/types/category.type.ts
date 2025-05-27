import {
  CategoryDetailDto,
  CategoryDto,
} from '@/shared/types/backend/category';
import { CommonState, PaginatedList, SearchState } from '@/shared/types/common';

export interface ICategoryState {
  category: CommonState<PaginatedList<CategoryDto>>;
  categoryDetail: CommonState<CategoryDetailDto>;
  searchParams: SearchState<CategoryDto>;
}
