import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchState } from '../../../shared/types/common';
import { CategoryDto } from '../../../shared/types/common/backend-model';
import { PaginatedList } from '../../../shared/types/common/paginated-list';
import { RootState } from '../../../stores/store';
import {
  CATEGORY_TABLE_FILTER_COLUMN,
  CATEGORY_TABLE_ORDER_COLUMN,
} from '../constants/category.const';
import { ICategoryState } from '../types/category.type';

import {
  toastError,
  toastSuccess,
} from '@/shared/components/feedback/toast/toast';
import { getItemPerPage } from '@/shared/utils/setting-util';
import { isNullOrEmpty } from '@/shared/utils/type-utils';

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
  searchParams: {
    pageIndex: 1,
    pageSize: getItemPerPage(),
    search: '',
    isAsc: true,
    filterBy: CATEGORY_TABLE_FILTER_COLUMN[0],
    sortBy: CATEGORY_TABLE_ORDER_COLUMN[0],
  },
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategoriesRequest: (
      state,
      _action: PayloadAction<Partial<SearchState<CategoryDto>>>,
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
    updateCategoryRequest: (state, _action: PayloadAction<CategoryDto>) => {
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
    updateSearchParams: (
      state,
      action: PayloadAction<Partial<SearchState<CategoryDto>>>,
    ) => {
      const { filterBy, isAsc, pageIndex, pageSize, search, sortBy } =
        action.payload;
      if (!isNullOrEmpty(filterBy)) {
        state.searchParams.filterBy = filterBy!;
      }
      if (!isNullOrEmpty(isAsc)) {
        state.searchParams.isAsc = isAsc!;
      }
      if (!isNullOrEmpty(pageIndex)) {
        state.searchParams.pageIndex = pageIndex!;
      }
      if (!isNullOrEmpty(pageSize)) {
        state.searchParams.pageSize = pageSize!;
      }
      if (!isNullOrEmpty(search)) {
        state.searchParams.search = search!;
      }
      if (!isNullOrEmpty(sortBy)) {
        state.searchParams.sortBy = sortBy!;
      }
    },
    updateSearchParamsByKey: (
      state,
      action: PayloadAction<{
        key: keyof SearchState<CategoryDto>;
        value: string | number | boolean;
      }>,
    ) => {
      const { key, value } = action.payload;
      if (key in state.searchParams) {
        // eslint-disable-next-line security/detect-object-injection
        (state.searchParams as Record<string, unknown>)[key] = value;
      }
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
  updateSearchParams,
  updateSearchParamsByKey,
  resetCategory,
} = categorySlice.actions;

export default categorySlice.reducer;

export const CategoriesState = (state: RootState) => state.category.categories;
export const CategoryState = (state: RootState) => state.category.category;
export const CategorySearchState = (state: RootState) =>
  state.category.searchParams;
