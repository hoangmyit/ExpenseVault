import { ICategoryDto } from '../model/category/category';
import { ApiResult } from '../model/common/common';
import { PaginatedList } from '../model/common/paginated-list';
import {
  httpServiceDelete,
  httpServiceGet,
  httpServicePost,
  httpServicePut,
} from './common/axios/axios-http.service';

export const getCategories = async (
  page = 1,
  pageSize = 10,
): Promise<ApiResult<PaginatedList<ICategoryDto>>> => {
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
): Promise<ApiResult<ICategoryDto>> => {
  const response = await httpServiceGet(`/api/category/${id}`);
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};

export const createCategory = async (
  category: ICategoryDto,
): Promise<ApiResult<string>> => {
  const response = await httpServicePost('/api/category', category);
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};

export const updateCategory = async (
  category: ICategoryDto,
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
    data: 'Category deleted successfully',
    status: response.status,
  };
};
