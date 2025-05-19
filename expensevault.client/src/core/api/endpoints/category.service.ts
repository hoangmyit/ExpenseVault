import {
  httpServiceDelete,
  httpServiceGet,
  httpServicePost,
  httpServicePut,
} from '../client';

import { CategoryParams } from '@/features/category/types/category.type';
import { ApiResult, PaginatedList } from '@/shared/types/common';
import { CategoryDto } from '@/shared/types/common/backend-model';

export const getCategories = async ({
  page = 1,
  pageSize = 10,
}: CategoryParams): Promise<ApiResult<PaginatedList<CategoryDto>>> => {
  const response = await httpServiceGet<PaginatedList<CategoryDto>>(
    '/api/category',
    {
      pageIndex: page,
      pageSize: pageSize,
    },
  );
  return {
    isSucessed: true,
    data: response.data,
    status: response.status,
  };
};

export const getCategory = async (
  id: string,
): Promise<ApiResult<CategoryDto>> => {
  const response = await httpServiceGet<CategoryDto>(`/api/category/${id}`);
  return {
    isSucessed: true,
    data: response.data,
    status: response.status,
  };
};

export const createCategory = async (
  category: CategoryDto,
): Promise<ApiResult<string>> => {
  const response = await httpServicePost<string>('/api/category', category);
  return {
    isSucessed: true,
    data: response.data,
    status: response.status,
  };
};

export const updateCategory = async (
  category: CategoryDto,
): Promise<ApiResult<string>> => {
  const response = await httpServicePut<string>(
    `/api/category/${category.id}`,
    category,
  );
  return {
    isSucessed: true,
    data: response.data,
    status: response.status,
  };
};

export const deleteCategory = async (
  id: string,
): Promise<ApiResult<string>> => {
  const response = await httpServiceDelete<string>(`/api/category/${id}`);
  return {
    isSucessed: true,
    data: response.data,
    status: response.status,
  };
};
