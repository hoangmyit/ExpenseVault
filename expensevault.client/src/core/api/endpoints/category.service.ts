import {
  httpServiceDelete,
  httpServiceGet,
  httpServicePost,
  httpServicePut,
} from '../client';

import { CategoryDto } from '@/shared/types/backend/category';
import { ApiResult, PaginatedList, SearchState } from '@/shared/types/common';
import { toPascalCase } from '@/shared/utils/string-util';

export const getCategories = async ({
  pageIndex = 1,
  pageSize = 10,
  search = '',
  sortBy = 'id',
  isAsc = false,
  filterBy = 'name',
}: Partial<SearchState<CategoryDto>>): Promise<
  ApiResult<PaginatedList<CategoryDto>>
> => {
  const response = await httpServiceGet<PaginatedList<CategoryDto>>(
    '/api/category',
    {
      pageIndex: pageIndex,
      pageSize: pageSize,
      search: search,
      sortBy: toPascalCase(sortBy),
      isAsc: isAsc,
      filterBy: toPascalCase(filterBy),
    },
  );
  return {
    isSuccess: true,
    data: response.data,
    status: response.status,
  };
};

export const getCategory = async (
  id: string,
): Promise<ApiResult<CategoryDto>> => {
  const response = await httpServiceGet<CategoryDto>(`/api/category/${id}`);
  return {
    isSuccess: true,
    data: response.data,
    status: response.status,
  };
};

export const createCategory = async (
  category: CategoryDto,
): Promise<ApiResult<string>> => {
  const response = await httpServicePost<string>('/api/category', category);
  return {
    isSuccess: true,
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
    isSuccess: true,
    data: response.data,
    status: response.status,
  };
};

export const deleteCategory = async (
  id: string,
): Promise<ApiResult<string>> => {
  const response = await httpServiceDelete<string>(`/api/category/${id}`);
  return {
    isSuccess: true,
    data: response.data,
    status: response.status,
  };
};
