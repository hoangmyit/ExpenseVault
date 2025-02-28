import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICategoryDto } from '../../../model/category/category';
import { PaginatedList } from '../../../model/common/paginated-list';
import { ICategoryState } from '../category.const';

const initialState: ICategoryState = {
  categories: {
    data: {
      data: [],
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
    getCategoriesRequest: (
      state,
      action: PayloadAction<{ page?: number; pageSize?: number }>,
    ) => {
      state.categories.status = 'loading';
      state.categories.error = null;
    },
    getCategoriesSuccess: (
      state,
      action: PayloadAction<PaginatedList<ICategoryDto>>,
    ) => {
      state.categories.status = 'succeeded';
      state.categories.data = action.payload;
    },
    getCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.categories.status = 'failed';
      state.categories.error = action.payload;
    },

    // Get single category actions
    getCategoryRequest: (state, action: PayloadAction<number | string>) => {
      state.category.status = 'loading';
      state.category.error = null;
    },
    getCategorySuccess: (state, action: PayloadAction<ICategoryDto>) => {
      state.category.status = 'succeeded';
      state.category.data = action.payload;
    },
    getCategoryFailure: (state, action: PayloadAction<string>) => {
      state.category.status = 'failed';
      state.category.error = action.payload;
    },

    // Create category actions
    createCategoryRequest: (state, action: PayloadAction<ICategoryDto>) => {
      state.category.status = 'loading';
      state.category.error = null;
    },
    createCategorySuccess: (state, action: PayloadAction<ICategoryDto>) => {
      state.category.status = 'succeeded';
      state.category.data = action.payload;
    },
    createCategoryFailure: (state, action: PayloadAction<string>) => {
      state.category.status = 'failed';
      state.category.error = action.payload;
    },

    // Update category actions
    updateCategoryRequest: (state, action: PayloadAction<ICategoryDto>) => {
      state.category.status = 'loading';
      state.category.error = null;
    },
    updateCategorySuccess: (state, action: PayloadAction<ICategoryDto>) => {
      state.category.status = 'succeeded';
      state.category.data = action.payload;
    },
    updateCategoryFailure: (state, action: PayloadAction<string>) => {
      state.category.status = 'failed';
      state.category.error = action.payload;
    },

    // Delete category actions
    deleteCategoryRequest: (state, action: PayloadAction<number | string>) => {
      state.category.status = 'loading';
      state.category.error = null;
    },
    deleteCategorySuccess: (state) => {
      state.category.status = 'succeeded';
      state.category.data = null;
    },
    deleteCategoryFailure: (state, action: PayloadAction<string>) => {
      state.category.status = 'failed';
      state.category.error = action.payload;
    },

    // Reset category state
    resetCategory: (state) => {
      state.category = initialState.category;
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
} = categorySlice.actions;

export default categorySlice.reducer;
