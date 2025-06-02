import { CategoryGroupResponse } from '@/shared/types/backend/category-group';
import { ValidationState } from '@/shared/types/common';

export type ICategoryGroupState = {
  categoryGroup: ValidationState<CategoryGroupResponse[]>;
};
