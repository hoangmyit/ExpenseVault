// useCategory.ts
import { useDispatch, useSelector } from 'react-redux';

import { CategoryDto } from '../../../shared/types/common/backend-model';
import {
  CategoriesState,
  createCategoryRequest,
  deleteCategoryRequest,
  getCategoriesRequest,
} from '../store/category-slice';
import { CategoryParams } from '../types/category';

export const useCategory = () => {
  const dispatch = useDispatch();
  const categoryData = useSelector(CategoriesState);

  const fetchCategories = (params: CategoryParams) =>
    dispatch(getCategoriesRequest(params));
  const createCategory = (category: CategoryDto) =>
    dispatch(createCategoryRequest(category));
  const deleteCategory = (id: string) => dispatch(deleteCategoryRequest(id));

  return {
    categories: categoryData.data,
    fetchCategories,
    createCategory,
    deleteCategory,
  };
};
