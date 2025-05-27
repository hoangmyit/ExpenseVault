import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../../../core/api/endpoints/category.service';
import { PaginatedList, SearchState } from '../../../shared/types/common';
import { handleApiCall } from '../../../shared/utils/saga-util';
import {
  CREATE_CATEGORY_ERROR_MESSAGE,
  CREATE_CATEGORY_PENDING_MESSAGE,
  CREATE_CATEGORY_SUCCESS_MESSAGE,
  DELETE_CATEGORY_ERROR_MESSAGE,
  DELETE_CATEGORY_PENDING_MESSAGE,
  DELETE_CATEGORY_SUCCESS_MESSAGE,
  GET_CATEGORIES_ERROR_MESSAGE,
  GET_CATEGORIES_PENDING_MESSAGE,
  GET_CATEGORIES_SUCCESS_MESSAGE,
  GET_CATEGORY_ERROR_MESSAGE,
  GET_CATEGORY_PENDING_MESSAGE,
  GET_CATEGORY_SUCCESS_MESSAGE,
  UPDATE_CATEGORY_ERROR_MESSAGE,
  UPDATE_CATEGORY_PENDING_MESSAGE,
  UPDATE_CATEGORY_SUCCESS_MESSAGE,
} from '../constants';

import {
  createCategoryFailure,
  createCategoryRequest,
  createCategorySuccess,
  deleteCategoryFailure,
  deleteCategoryRequest,
  deleteCategorySuccess,
  getCategoriesFailure,
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoryDetailFailure,
  getCategoryDetailRequest,
  getCategoryDetailSuccess,
  updateCategoryFailure,
  updateCategoryRequest,
  updateCategorySuccess,
  updateSearchParams,
} from './category-slice';

import { CategoryDto } from '@/shared/types/backend/category';
import { getLangText } from '@/shared/utils/language-util';
import { isNullOrEmpty } from '@/shared/utils/type-utils';

function* getCategoriesSaga(action: PayloadAction<SearchState<CategoryDto>>) {
  yield* handleApiCall(
    getCategories,
    action.payload,
    (data: PaginatedList<CategoryDto>) => getCategoriesSuccess(data),
    (error) => getCategoriesFailure(error),
    {
      useToastPromise: true,
      error: getLangText(GET_CATEGORIES_ERROR_MESSAGE),
      pending: getLangText(GET_CATEGORIES_PENDING_MESSAGE),
      success: getLangText(GET_CATEGORIES_SUCCESS_MESSAGE),
    },
    {
      stateValue: (state) => state.category.searchParams,
      updateRequest: (state) => {
        const enrichRequest = {
          ...state,
        };
        const { filterBy, isAsc, pageIndex, pageSize, search, sortBy } =
          action.payload;
        if (!isNullOrEmpty(filterBy)) {
          enrichRequest.filterBy = filterBy;
        }
        if (!isNullOrEmpty(isAsc)) {
          enrichRequest.isAsc = isAsc!;
        }
        if (!isNullOrEmpty(pageIndex)) {
          enrichRequest.pageIndex = pageIndex;
        }
        if (!isNullOrEmpty(pageSize)) {
          enrichRequest.pageSize = pageSize;
        }
        if (!isNullOrEmpty(search)) {
          enrichRequest.search = search;
        }
        if (!isNullOrEmpty(sortBy)) {
          enrichRequest.sortBy = sortBy;
        }
        return enrichRequest;
      },
    },
    updateSearchParams,
  );
}

function* getCategorySaga(action: PayloadAction<string>) {
  yield* handleApiCall(
    getCategory,
    action.payload,
    (data: CategoryDto) => getCategoryDetailSuccess(data),
    (error) => getCategoryDetailFailure(error),
    {
      useToastPromise: true,
      error: getLangText(GET_CATEGORY_ERROR_MESSAGE),
      pending: getLangText(GET_CATEGORY_PENDING_MESSAGE),
      success: getLangText(GET_CATEGORY_SUCCESS_MESSAGE),
    },
  );
}

function* createCategorySaga(action: PayloadAction<CategoryDto>) {
  const category = action.payload;
  yield* handleApiCall(
    createCategory,
    category,
    (data: string) => createCategorySuccess(data),
    (error) => createCategoryFailure(error),
    {
      useToastPromise: true,
      error: getLangText(CREATE_CATEGORY_ERROR_MESSAGE),
      pending: getLangText(CREATE_CATEGORY_PENDING_MESSAGE),
      success: getLangText(CREATE_CATEGORY_SUCCESS_MESSAGE),
    },
  );
}

function* updateCategorySaga(action: PayloadAction<CategoryDto>) {
  const category = action.payload;
  yield* handleApiCall(
    updateCategory,
    category,
    () => updateCategorySuccess(category), // Note: Using the original category rather than response data
    (error) => updateCategoryFailure(error),
    {
      useToastPromise: true,
      error: getLangText(UPDATE_CATEGORY_ERROR_MESSAGE),
      pending: getLangText(UPDATE_CATEGORY_PENDING_MESSAGE),
      success: getLangText(UPDATE_CATEGORY_SUCCESS_MESSAGE),
    },
  );
}

function* deleteCategorySaga(action: PayloadAction<string>) {
  const id = action.payload;
  yield* handleApiCall(
    deleteCategory,
    id,
    (data: string) => deleteCategorySuccess(data),
    (error) => deleteCategoryFailure(error),
    {
      useToastPromise: true,
      error: getLangText(DELETE_CATEGORY_ERROR_MESSAGE),
      pending: getLangText(DELETE_CATEGORY_PENDING_MESSAGE),
      success: getLangText(DELETE_CATEGORY_SUCCESS_MESSAGE),
    },
  );
}

function* categorySaga() {
  yield takeLatest(getCategoriesRequest.type, getCategoriesSaga);
  yield takeLatest(getCategoryDetailRequest.type, getCategorySaga);
  yield takeLatest(createCategoryRequest.type, createCategorySaga);
  yield takeLatest(updateCategoryRequest.type, updateCategorySaga);
  yield takeLatest(deleteCategoryRequest.type, deleteCategorySaga);
}

export default categorySaga;
