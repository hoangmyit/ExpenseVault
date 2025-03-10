import { ApiResult, PaginatedList } from '../../shared/types/common';
import { CategoryDto } from '../../shared/types/common/backend-model';
import {
  httpServiceDelete,
  httpServiceGet,
  httpServicePost,
  httpServicePut,
} from '../client';

export const getCategories = async (
  page = 1,
  pageSize = 10,
): Promise<ApiResult<PaginatedList<CategoryDto>>> => {
  const response = await httpServiceGet<PaginatedList<CategoryDto>>(
    '/api/category',
    {
      pageIndex: page,
      pageSize: pageSize,
    },
  );
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};

export const getCategory = async (
  id: string,
): Promise<ApiResult<CategoryDto>> => {
  const response = await httpServiceGet<CategoryDto>(`/api/category/${id}`);
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};

export const createCategory = async (
  category: CategoryDto,
): Promise<ApiResult<string>> => {
  const response = await httpServicePost<string>('/api/category', category);
  return {
    success: true,
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
    success: true,
    data: response.data,
    status: response.status,
  };
};

export const deleteCategory = async (
  id: string,
): Promise<ApiResult<string>> => {
  const response = await httpServiceDelete<string>(`/api/category/${id}`);
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};
