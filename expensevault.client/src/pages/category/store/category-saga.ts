import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CallEffect, PutEffect } from 'redux-saga/effects';

import { ICategoryDto } from '../../../model/category/category';
import { ApiResult } from '../../../model/common/common';
import { PaginatedList } from '../../../model/common/paginated-list';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../../../services/category.service';
import { getErrorMessage } from '../../../utils/common-util';
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

function* getCategoriesSaga(
  action: PayloadAction<{ page?: number; pageSize?: number }>,
): Generator<
  | CallEffect<ApiResult<PaginatedList<ICategoryDto>>>
  | PutEffect<
      ReturnType<typeof getCategoriesSuccess | typeof getCategoriesFailure>
    >,
  void,
  PaginatedList<ICategoryDto>
> {
  try {
    const { page, pageSize } = action.payload;
    const response = yield call(getCategories, page, pageSize);
    yield put(getCategoriesSuccess(response));
  } catch (error) {
    put(
      getCategoriesFailure(
        getErrorMessage(error, 'Failed to fetch category details'),
      ),
    );
  }
}

function* getCategorySaga(
  action: PayloadAction<string>,
): Generator<
  | CallEffect<ApiResult<ICategoryDto>>
  | PutEffect<
      ReturnType<typeof getCategorySuccess | typeof getCategoryFailure>
    >,
  void,
  ICategoryDto
> {
  try {
    const response = yield call(getCategory, action.payload);
    yield put(getCategorySuccess(response));
  } catch (error) {
    yield put(
      getCategoryFailure(
        getErrorMessage(error, 'Failed to fetch category details'),
      ),
    );
  }
}

function* createCategorySaga(
  action: PayloadAction<ICategoryDto>,
): Generator<
  | CallEffect<ApiResult<string>>
  | PutEffect<
      ReturnType<typeof createCategorySuccess | typeof createCategoryFailure>
    >,
  void,
  string
> {
  try {
    const category = action.payload;
    const response = yield call(createCategory, category);
    yield put(createCategorySuccess(response));
  } catch (error) {
    yield put(
      createCategoryFailure(
        getErrorMessage(error, 'Failed to create category'),
      ),
    );
  }
}

function* updateCategorySaga(
  action: PayloadAction<ICategoryDto>,
): Generator<
  | CallEffect<ApiResult<string>>
  | PutEffect<
      ReturnType<typeof updateCategorySuccess | typeof updateCategoryFailure>
    >,
  void,
  string
> {
  try {
    const category = action.payload;
    const response = yield call(updateCategory, category);
    console.log(response);
    yield put(updateCategorySuccess(category));
  } catch (error) {
    yield put(
      updateCategoryFailure(
        getErrorMessage(error, 'Failed to update category'),
      ),
    );
  }
}

function* deleteCategorySaga(
  action: PayloadAction<string>,
): Generator<
  | CallEffect<ApiResult<string>>
  | PutEffect<
      ReturnType<typeof deleteCategorySuccess | typeof deleteCategoryFailure>
    >,
  void,
  string
> {
  try {
    const id = action.payload;
    yield call(deleteCategory, id);
    yield put(deleteCategorySuccess());
  } catch (error) {
    yield put(
      deleteCategoryFailure(
        getErrorMessage(error, 'Failed to delete category'),
      ),
    );
  }
}

export function* categorySaga() {
  yield takeLatest(getCategoriesRequest.type, getCategoriesSaga);
  yield takeLatest(getCategoryRequest.type, getCategorySaga);
  yield takeLatest(createCategoryRequest.type, createCategorySaga);
  yield takeLatest(updateCategoryRequest.type, updateCategorySaga);
  yield takeLatest(deleteCategoryRequest.type, deleteCategorySaga);
}
