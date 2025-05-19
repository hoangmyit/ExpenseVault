import { httpServiceGet } from '@/core/api/client';
import { ApiResult } from '@/shared/types/common';

export const getPermissionsService = async (): Promise<ApiResult<string[]>> => {
  const response = await httpServiceGet<string[]>(
    '/api/permission/permissions',
  );
  return {
    isSucessed: true,
    data: response.data,
    status: response.status,
  };
};
