import {
  httpServiceDelete,
  httpServiceGet,
  httpServicePost,
  httpServicePut,
} from '../client';

import { CategoryFormData } from '@/features/category/schemas/category-schema';
import { CategoryDto } from '@/shared/types/backend/category';
import { ApiResult, PaginatedList, SearchState } from '@/shared/types/common';
import { toPascalCase } from '@/shared/utils/string-util';

export const getCategoriesService = async ({
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

export const getCategoryDetailService = async (
  id: string,
): Promise<ApiResult<CategoryFormData>> => {
  const response = await httpServiceGet<CategoryFormData>(
    `/api/category/${id}`,
  );
  return {
    isSuccess: true,
    data: response.data,
    status: response.status,
  };
};

export const createCategoryService = async (
  category: CategoryFormData,
): Promise<ApiResult<string>> => {
  const response = await httpServicePost<string>('/api/category', category);
  return {
    isSuccess: true,
    data: response.data,
    status: response.status,
  };
};

export const updateCategoryService = async (
  category: CategoryFormData,
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

export const deleteCategoryService = async (
  id: string,
): Promise<ApiResult<string>> => {
  const response = await httpServiceDelete<string>(`/api/category/${id}`);
  return {
    isSuccess: true,
    data: response.data,
    status: response.status,
  };
};
