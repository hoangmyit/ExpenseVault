import { CategoryGroupResponse } from '@/shared/types/backend/category-group';
import { CommonState } from '@/shared/types/common';

export type ICategoryGroupState = {
  categoryGroup: CommonState<CategoryGroupResponse[]>;
};
