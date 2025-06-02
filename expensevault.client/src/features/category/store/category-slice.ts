import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchState } from '../../../shared/types/common';
import { PaginatedList } from '../../../shared/types/common/paginated-list';
import { RootState } from '../../../stores/store';
import {
  CATEGORY_TABLE_FILTER_COLUMN,
  CATEGORY_TABLE_ORDER_COLUMN,
} from '../constants/category.const';
import { CategoryFormData } from '../schemas/category-schema';
import { ICategoryState } from '../types/category.type';

import { toastSuccess } from '@/shared/components/feedback/toast/toast';
import { CategoryDto } from '@/shared/types/backend/category';
import { throwTypeErrorIf } from '@/shared/utils/common-util';
import { initSupportLanguageField } from '@/shared/utils/language-util';
import { updateDirectPartialObject } from '@/shared/utils/object-util';
import { getItemPerPage } from '@/shared/utils/setting-util';
import { isNullOrEmpty } from '@/shared/utils/type-utils';

const initialState: ICategoryState = {
  category: {
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
  categoryDetail: {
    data: null,
    status: 'idle',
    error: null,
    errors: {},
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
      state.category.status = 'loading';
      state.category.error = null;
    },
    getCategoriesSuccess: (
      state,
      action: PayloadAction<PaginatedList<CategoryDto>>,
    ) => {
      state.category.status = 'succeeded';
      state.category.data = action.payload;
    },
    getCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.category.status = 'failed';
      state.category.error = action.payload;
    },
    // Get single category actions
    getCategoryDetailRequest: (state, _action: PayloadAction<string>) => {
      state.categoryDetail.status = 'loading';
      state.categoryDetail.error = null;
    },
    getCategoryDetailSuccess: (
      state,
      action: PayloadAction<CategoryFormData>,
    ) => {
      state.categoryDetail.status = 'succeeded';
      state.categoryDetail.data = action.payload;
    },
    getCategoryDetailFailure: (state, action: PayloadAction<string>) => {
      state.categoryDetail.status = 'failed';
      state.categoryDetail.error = action.payload;
    },
    initCategoryState: (state) => {
      state.categoryDetail.data = {
        id: undefined,
        name: initSupportLanguageField(),
        description: initSupportLanguageField(),
        avatar: '',
        isDefault: false,
        groupId: 0,
      };
    },
    setCategoryDetailErrors: (
      state,
      action: PayloadAction<Partial<Record<keyof CategoryFormData, string[]>>>,
    ) => {
      throwTypeErrorIf(
        isNullOrEmpty(state.categoryDetail.data),
        'Category detail data is not initialized',
      );
      state.categoryDetail.errors = action.payload;
      // Reset status to idle when setting validation errors
      state.categoryDetail.status = 'idle';
    },
    // Create category actions
    createCategoryRequest: (
      state,
      _action: PayloadAction<CategoryFormData>,
    ) => {
      state.categoryDetail.status = 'loading';
      state.categoryDetail.error = null;
    },
    setPartialCategoryDetail: (
      state,
      action: PayloadAction<Partial<CategoryFormData>>,
    ) => {
      throwTypeErrorIf(
        isNullOrEmpty(state.categoryDetail.data),
        'Category detail data is not initialized',
      );
      updateDirectPartialObject(state.categoryDetail.data!, action.payload);
    },
    createCategorySuccess: (state, _action: PayloadAction<string>) => {
      state.categoryDetail.status = 'succeeded';
    },
    createCategoryFailure: (state, action: PayloadAction<string>) => {
      state.categoryDetail.status = 'failed';
      state.categoryDetail.error = action.payload;
    },

    // Update category actions
    updateCategoryRequest: (
      state,
      _action: PayloadAction<CategoryFormData>,
    ) => {
      state.categoryDetail.status = 'loading';
      state.categoryDetail.error = null;
    },
    updateCategorySuccess: (state, action: PayloadAction<CategoryFormData>) => {
      state.categoryDetail.status = 'succeeded';
      state.categoryDetail.data = action.payload;
    },
    updateCategoryFailure: (state, action: PayloadAction<string>) => {
      state.categoryDetail.status = 'failed';
      state.categoryDetail.error = action.payload;
    },

    // Delete category actions
    deleteCategoryRequest: (state, _action: PayloadAction<string>) => {
      state.categoryDetail.status = 'loading';
      state.categoryDetail.error = null;
    },
    deleteCategorySuccess: (state, action: PayloadAction<string>) => {
      state.categoryDetail.status = 'succeeded';
      state.categoryDetail.data = null;
      toastSuccess(action.payload);
    },
    deleteCategoryFailure: (state, action: PayloadAction<string>) => {
      state.categoryDetail.status = 'failed';
      state.categoryDetail.error = action.payload;
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
        (state.searchParams as Record<string, unknown>)[key] = value;
      }
    },
    // Reset category state
    resetCategory: (state) => {
      state.categoryDetail = initialState.categoryDetail;
    },
  },
});

export const {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFailure,
  getCategoryDetailRequest,
  getCategoryDetailSuccess,
  getCategoryDetailFailure,
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
  initCategoryState,
  setPartialCategoryDetail,
  setCategoryDetailErrors,
} = categorySlice.actions;

export default categorySlice.reducer;

export const CategoryState = (state: RootState) => state.category.category;
export const CategoryDetailState = (state: RootState) =>
  state.category.categoryDetail;
export const CategorySearchState = (state: RootState) =>
  state.category.searchParams;
