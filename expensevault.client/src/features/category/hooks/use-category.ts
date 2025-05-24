// useCategory.ts
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CategoryDto } from '../../../shared/types/common/backend-model';
import {
  CategoriesState,
  CategorySearchState,
  CategoryState,
  createCategoryRequest,
  deleteCategoryRequest,
  getCategoriesRequest,
  getCategoryRequest,
  updateCategoryRequest,
  updateSearchParamsByKey,
} from '../store/category-slice';

import { SearchState } from '@/shared/types/common';

export const useCategory = () => {
  const dispatch = useDispatch();
  const categoriesData = useSelector(CategoriesState);
  const categoryData = useSelector(CategoryState);
  const searchParams = useSelector(CategorySearchState);

  const getCategories = useCallback(
    (params: Partial<SearchState<CategoryDto>>) =>
      dispatch(getCategoriesRequest(params)),
    [dispatch],
  );
  const createCategory = useCallback(
    (category: CategoryDto) => dispatch(createCategoryRequest(category)),
    [dispatch],
  );
  const deleteCategory = useCallback(
    (id: string) => dispatch(deleteCategoryRequest(id)),
    [dispatch],
  );
  const getCategory = useCallback(
    (id: string) => dispatch(getCategoryRequest(id)),
    [dispatch],
  );
  const updateCategory = useCallback(
    (category: CategoryDto) => dispatch(updateCategoryRequest(category)),
    [dispatch],
  );
  const updateSearchParams = useCallback(
    (key: keyof SearchState<CategoryDto>, value: string | number | boolean) =>
      dispatch(updateSearchParamsByKey({ key, value })),
    [dispatch],
  );

  return {
    categories: categoriesData.data,
    categoriesStatus: categoriesData.status,
    getCategories,
    createCategory,
    deleteCategory,
    getCategory,
    category: categoryData.data,
    categoryStatus: categoryData.status,
    updateCategory,
    searchParams,
    updateSearchParams,
  };
};
