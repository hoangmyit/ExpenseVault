// useCategory.ts
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CategoryDto } from '../../../shared/types/common/backend-model';
import {
  CategoriesState,
  CategoryState,
  createCategoryRequest,
  deleteCategoryRequest,
  getCategoriesRequest,
  getCategoryRequest,
  updateCategoryRequest,
} from '../store/category-slice';
import { CategoryParams } from '../types/category.type';

export const useCategory = () => {
  const dispatch = useDispatch();
  const categoriesData = useSelector(CategoriesState);
  const categoryData = useSelector(CategoryState);

  const getCategories = useCallback(
    (params: CategoryParams) => dispatch(getCategoriesRequest(params)),
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

  return {
    categories: categoriesData.data,
    getCategories,
    createCategory,
    deleteCategory,
    getCategory,
    category: categoryData.data,
    updateCategory,
  };
};
