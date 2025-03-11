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
import { CategoryParams } from '../types/category';

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
  );
}

function* getCategorySaga(action: PayloadAction<string>) {
  yield* handleApiCall(
    getCategory,
    action.payload,
    (data: CategoryDto) => getCategorySuccess(data),
    (error) => getCategoryFailure(error),
  );
}

function* createCategorySaga(action: PayloadAction<CategoryDto>) {
  const category = action.payload;
  yield* handleApiCall(
    createCategory,
    category,
    (data: string) => createCategorySuccess(data),
    (error) => createCategoryFailure(error),
  );
}

function* updateCategorySaga(action: PayloadAction<CategoryDto>) {
  const category = action.payload;
  yield* handleApiCall(
    updateCategory,
    category,
    () => updateCategorySuccess(category), // Note: Using the original category rather than response data
    (error) => updateCategoryFailure(error),
  );
}

function* deleteCategorySaga(action: PayloadAction<string>) {
  const id = action.payload;
  yield* handleApiCall(
    deleteCategory,
    id,
    (data: string) => deleteCategorySuccess(data),
    (error) => deleteCategoryFailure(error),
  );
}

export function* categorySaga() {
  yield takeLatest(getCategoriesRequest.type, getCategoriesSaga);
  yield takeLatest(getCategoryRequest.type, getCategorySaga);
  yield takeLatest(createCategoryRequest.type, createCategorySaga);
  yield takeLatest(updateCategoryRequest.type, updateCategorySaga);
  yield takeLatest(deleteCategoryRequest.type, deleteCategorySaga);
}
