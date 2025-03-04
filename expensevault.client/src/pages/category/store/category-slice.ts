import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoryDto } from '../../../model/common/backend-model';
import { PaginatedList } from '../../../model/common/paginated-list';
import { RootState } from '../../../stores/store';
import { ICategoryState } from '../category.const';

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
    getCategoriesRequest: (
      state,
      _action: PayloadAction<{ page?: number; pageSize?: number }>,
    ) => {
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
    },

    // Create category actions
    createCategoryRequest: (state, _action: PayloadAction<CategoryDto>) => {
      state.category.status = 'loading';
      state.category.error = null;
    },
    createCategorySuccess: (state, action: PayloadAction<string>) => {
      state.category.status = 'succeeded';
      console.log(action.payload);
      // state.category.data = action.payload;
    },
    createCategoryFailure: (state, action: PayloadAction<string>) => {
      state.category.status = 'failed';
      state.category.error = action.payload;
    },

    // Update category actions
    updateCategoryRequest: (state, _action: PayloadAction<string>) => {
      state.category.status = 'loading';
      state.category.error = null;
    },
    updateCategorySuccess: (state, action: PayloadAction<CategoryDto>) => {
      state.category.status = 'succeeded';
      state.category.data = action.payload;
    },
    updateCategoryFailure: (state, action: PayloadAction<string>) => {
      state.category.status = 'failed';
      state.category.error = action.payload;
    },

    // Delete category actions
    deleteCategoryRequest: (state, _action: PayloadAction<number | string>) => {
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

export const CategoriesState = (state: RootState) => state.category.categories;
export const CategoryState = (state: RootState) => state.category.category;
