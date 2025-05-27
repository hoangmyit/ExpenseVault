// useCategory.ts
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CategoryDetailState,
  CategorySearchState,
  CategoryState,
  createCategoryRequest,
  deleteCategoryRequest,
  getCategoriesRequest,
  getCategoryDetailRequest,
  initCategoryState,
  updateCategoryRequest,
  updateSearchParamsByKey,
} from '../store/category-slice';

import {
  CategoryDetailDto,
  CategoryDto,
} from '@/shared/types/backend/category';
import { SearchState } from '@/shared/types/common';

export const useCategory = () => {
  const dispatch = useDispatch();
  const categoriesData = useSelector(CategoryState);
  const categoryDetailData = useSelector(CategoryDetailState);
  const searchParams = useSelector(CategorySearchState);

  const getCategories = useCallback(
    (params: Partial<SearchState<CategoryDto>>) =>
      dispatch(getCategoriesRequest(params)),
    [dispatch],
  );
  const createCategory = useCallback(
    (category: CategoryDetailDto) => dispatch(createCategoryRequest(category)),
    [dispatch],
  );
  const deleteCategory = useCallback(
    (id: string) => dispatch(deleteCategoryRequest(id)),
    [dispatch],
  );
  const getCategoryDetail = useCallback(
    (id: string) => dispatch(getCategoryDetailRequest(id)),
    [dispatch],
  );
  const updateCategory = useCallback(
    (category: CategoryDetailDto) => dispatch(updateCategoryRequest(category)),
    [dispatch],
  );
  const updateSearchParams = useCallback(
    (key: keyof SearchState<CategoryDto>, value: string | number | boolean) =>
      dispatch(updateSearchParamsByKey({ key, value })),
    [dispatch],
  );

  const initCategoryDetail = useCallback(() => {
    dispatch(initCategoryState());
  }, [dispatch]);

  return {
    categories: categoriesData.data,
    categoriesStatus: categoriesData.status,
    getCategories,
    createCategory,
    deleteCategory,
    getCategoryDetail,
    categoryDetail: categoryDetailData.data,
    categoryDetailStatus: categoryDetailData.status,
    updateCategory,
    searchParams,
    updateSearchParams,
    initCategoryDetail,
  };
};
