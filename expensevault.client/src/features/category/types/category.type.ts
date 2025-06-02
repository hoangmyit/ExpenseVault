import { CategoryFormData } from '../schemas/category-schema';

import { CategoryDto } from '@/shared/types/backend/category';
import {
  CommonState,
  PaginatedList,
  SearchState,
  ValidationState,
} from '@/shared/types/common';

export interface ICategoryState {
  category: CommonState<PaginatedList<CategoryDto>>;
  categoryDetail: ValidationState<CategoryFormData>;
  searchParams: SearchState<CategoryDto>;
}
