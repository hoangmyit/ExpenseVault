import { CommonState, PaginatedList } from '@/shared/types/common';
import { CategoryDto } from '@/shared/types/common/backend-model';

export type CategoryParams = { page?: number; pageSize?: number };

export interface ICategoryState {
  categories: CommonState<PaginatedList<CategoryDto>>;
  category: CommonState<CategoryDto>;
}
