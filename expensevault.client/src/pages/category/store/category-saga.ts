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
    if (error instanceof Error) {
      yield put(
        getCategoriesFailure(error.message || 'Failed to fetch categories'),
      );
    } else {
      yield put(getCategoriesFailure('Failed to fetch categories'));
    }
  }
}

function* getCategorySaga(
  action: PayloadAction<number | string>,
): Generator<
  CallEffect<ApiResult<ICategoryDto>> | PutEffect<any>,
  void,
  ICategoryDto
> {
  try {
    const id = action.payload;
    const response = yield call(getCategory, id);
    yield put(getCategorySuccess(response));
  } catch (error) {
    yield put(getCategoryFailure(error.message || 'Failed to fetch category'));
  }
}

function* createCategorySaga(
  action: PayloadAction<ICategoryDto>,
): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  try {
    const category = action.payload;
    const response = yield call(createCategory, category);
    yield put(createCategorySuccess(response));
  } catch (error) {
    yield put(
      createCategoryFailure(error.message || 'Failed to create category'),
    );
  }
}

function* updateCategorySaga(
  action: PayloadAction<ICategoryDto>,
): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  try {
    const category = action.payload;
    const response = yield call(updateCategory, category);
    yield put(updateCategorySuccess(response));
  } catch (error) {
    yield put(
      updateCategoryFailure(error.message || 'Failed to update category'),
    );
  }
}

function* deleteCategorySaga(
  action: PayloadAction<string>,
): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  try {
    const id = action.payload;
    yield call(deleteCategory, id);
    yield put(deleteCategorySuccess());
  } catch (error) {
    yield put(
      deleteCategoryFailure(error.message || 'Failed to delete category'),
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
