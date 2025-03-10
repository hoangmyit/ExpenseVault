import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  toastError,
  toastSuccess,
} from '../../../shared/components/toast/toast-event';
import { CommonState } from '../../../shared/types/common';
import { CategoryDto } from '../../../shared/types/common/backend-model';
import { PaginatedList } from '../../../shared/types/common/paginated-list';
import { RootState } from '../../../stores/store';
import { ICategoryState } from '../category.const';
import { CategoryParams } from '../types/category';

const initialState: ICategoryState = {
  categories: {
    data: {
      items: [],
      pageIndex: 1,
      totalCount: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
    status: 'idle',
    error: null,
  },
  category: {
    data: null,
    status: 'idle',
    error: null,
  },
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // Get categories actions
    getCategoriesRequest: (state, _action: PayloadAction<CategoryParams>) => {
      state.categories.status = 'loading';
      state.categories.error = null;
    },
    getCategoriesSuccess: (
      state,
      action: PayloadAction<PaginatedList<CategoryDto>>,
    ) => {
      state.categories.status = 'succeeded';
      state.categories.data = action.payload;
    },
    getCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.categories.status = 'failed';
      state.categories.error = action.payload;
      toastError(action.payload);
    },
    // Get single category actions
    getCategoryRequest: (state, _action: PayloadAction<string>) => {
      state.category.status = 'loading';
      state.category.error = null;
    },
    getCategorySuccess: (state, action: PayloadAction<CategoryDto>) => {
      state.category.status = 'succeeded';
      state.category.data = action.payload;
    },
    getCategoryFailure: (state, action: PayloadAction<string>) => {
      state.category.status = 'failed';
      state.category.error = action.payload;
      toastError(action.payload);
    },

    // Create category actions
    createCategoryRequest: (state, _action: PayloadAction<CategoryDto>) => {
      state.category.status = 'loading';
      state.category.error = null;
    },
    createCategorySuccess: (state, action: PayloadAction<string>) => {
      state.category.status = 'succeeded';
      toastSuccess(action.payload);
    },
    createCategoryFailure: (state, action: PayloadAction<string>) => {
      state.category.status = 'failed';
      state.category.error = action.payload;
      toastError(action.payload);
    },

    // Update category actions
    updateCategoryRequest: (state, _action: PayloadAction<string>) => {
      state.category.status = 'loading';
      state.category.error = null;
    },
    updateCategorySuccess: (state, action: PayloadAction<CategoryDto>) => {
      state.category.status = 'succeeded';
      state.category.data = action.payload;
      toastSuccess(`Update category ${action.payload.name} successfully`);
    },
    updateCategoryFailure: (state, action: PayloadAction<string>) => {
      state.category.status = 'failed';
      state.category.error = action.payload;
      toastError(action.payload);
    },

    // Delete category actions
    deleteCategoryRequest: (state, _action: PayloadAction<string>) => {
      state.category.status = 'loading';
      state.category.error = null;
    },
    deleteCategorySuccess: (state, action: PayloadAction<string>) => {
      state.category.status = 'succeeded';
      state.category.data = null;
      toastSuccess(action.payload);
    },
    deleteCategoryFailure: (state, action: PayloadAction<string>) => {
      state.category.status = 'failed';
      state.category.error = action.payload;
      toastError(action.payload);
    },

    // Reset category state
    resetCategory: (state) => {
      state.category = initialState.category;
    },

    setCategory: (state, action: PayloadAction<CategoryDto>) => {
      state.category.data = action.payload;
    },
  },
});

export const {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFailure,
  getCategoryRequest,
  getCategorySuccess,
  getCategoryFailure,
  createCategoryRequest,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure,
  resetCategory,
  setCategory,
} = categorySlice.actions;

export default categorySlice.reducer;

export const CategoriesState = (state: RootState) =>
  state.category.categories as CommonState<PaginatedList<CategoryDto>>;
export const CategoryState = (state: RootState) =>
  state.category.category as CommonState<CategoryDto>;
