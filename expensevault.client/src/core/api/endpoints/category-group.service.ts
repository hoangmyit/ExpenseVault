import { httpServiceGet } from '../client';

import { CategoryGroupResponse } from '@/shared/types/backend/category-group';
import { ApiResult } from '@/shared/types/common';

export const getCategoryGroupService = async (): Promise<
  ApiResult<CategoryGroupResponse[]>
> => {
  const response = await httpServiceGet<CategoryGroupResponse[]>(
    '/api/category-group',
  );
  return {
    isSuccess: true,
    data: response.data,
    status: response.status,
  };
};
