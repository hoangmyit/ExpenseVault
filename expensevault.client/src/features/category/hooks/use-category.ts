// useCategory.ts
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
import { CategoryParams } from '../types/category';

export const useCategory = () => {
  const dispatch = useDispatch();
  const categoriesData = useSelector(CategoriesState);
  const categoryData = useSelector(CategoryState);

  const fetchCategories = (params: CategoryParams) =>
    dispatch(getCategoriesRequest(params));
  const createCategory = (category: CategoryDto) =>
    dispatch(createCategoryRequest(category));
  const deleteCategory = (id: string) => dispatch(deleteCategoryRequest(id));
  const getCategory = (id: string) => dispatch(getCategoryRequest(id));
  const updateCategory = (category: CategoryDto) =>
    dispatch(updateCategoryRequest(category));

  return {
    categories: categoriesData.data,
    fetchCategories,
    createCategory,
    deleteCategory,
    getCategory,
    category: categoryData.data,
    updateCategory,
  };
};
