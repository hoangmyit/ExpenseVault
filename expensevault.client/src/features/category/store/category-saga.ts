import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../../../core/api/endpoints/category.service';
import { PaginatedList } from '../../../shared/types/common';
import { CategoryDto } from '../../../shared/types/common/backend-model';
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
import { CategoryParams } from '../types/category.type';

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
  getCategoryFailure,
  getCategoryRequest,
  getCategorySuccess,
  updateCategoryFailure,
  updateCategoryRequest,
  updateCategorySuccess,
} from './category-slice';

function* getCategoriesSaga(action: PayloadAction<CategoryParams>) {
  yield* handleApiCall(
    getCategories,
    action.payload,
    (data: PaginatedList<CategoryDto>) => getCategoriesSuccess(data),
    (error) => getCategoriesFailure(error),
    {
      useToastPromise: true,
      error: GET_CATEGORIES_ERROR_MESSAGE,
      pending: GET_CATEGORIES_PENDING_MESSAGE,
      success: GET_CATEGORIES_SUCCESS_MESSAGE,
    },
  );
}

function* getCategorySaga(action: PayloadAction<string>) {
  yield* handleApiCall(
    getCategory,
    action.payload,
    (data: CategoryDto) => getCategorySuccess(data),
    (error) => getCategoryFailure(error),
    {
      useToastPromise: true,
      error: GET_CATEGORY_ERROR_MESSAGE,
      pending: GET_CATEGORY_PENDING_MESSAGE,
      success: GET_CATEGORY_SUCCESS_MESSAGE,
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
      error: CREATE_CATEGORY_ERROR_MESSAGE,
      pending: CREATE_CATEGORY_PENDING_MESSAGE,
      success: CREATE_CATEGORY_SUCCESS_MESSAGE,
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
      error: UPDATE_CATEGORY_ERROR_MESSAGE,
      pending: UPDATE_CATEGORY_PENDING_MESSAGE,
      success: UPDATE_CATEGORY_SUCCESS_MESSAGE,
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
      error: DELETE_CATEGORY_ERROR_MESSAGE,
      pending: DELETE_CATEGORY_PENDING_MESSAGE,
      success: DELETE_CATEGORY_SUCCESS_MESSAGE,
    },
  );
}

function* categorySaga() {
  yield takeLatest(getCategoriesRequest.type, getCategoriesSaga);
  yield takeLatest(getCategoryRequest.type, getCategorySaga);
  yield takeLatest(createCategoryRequest.type, createCategorySaga);
  yield takeLatest(updateCategoryRequest.type, updateCategorySaga);
  yield takeLatest(deleteCategoryRequest.type, deleteCategorySaga);
}

export default categorySaga;
