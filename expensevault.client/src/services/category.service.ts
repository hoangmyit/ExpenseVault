import { ApiResult, PaginatedList } from '../model/common';
import { CategoryDto } from '../model/common/backend-model';
import {
  httpServiceDelete,
  httpServiceGet,
  httpServicePost,
  httpServicePut,
} from './common/axios/http.service';

export const getCategories = async (
  page = 1,
  pageSize = 10,
): Promise<ApiResult<PaginatedList<CategoryDto>>> => {
  const response = await httpServiceGet('/api/category', {
    pageIndex: page,
    pageSize: pageSize,
  });
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};

export const getCategory = async (
  id: string,
): Promise<ApiResult<CategoryDto>> => {
  const response = await httpServiceGet(`/api/category/${id}`);
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};

export const createCategory = async (
  category: CategoryDto,
): Promise<ApiResult<string>> => {
  const response = await httpServicePost('/api/category', category);
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};

export const updateCategory = async (
  category: CategoryDto,
): Promise<ApiResult<string>> => {
  const response = await httpServicePut(
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
  const response = await httpServiceDelete(`/api/category/${id}`);
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};
