import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CallEffect, PutEffect } from 'redux-saga/effects';

import { ApiResult, PaginatedList } from '../../../model/common';
import { CategoryDto } from '../../../model/common/backend-model';
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
  | CallEffect<ApiResult<PaginatedList<CategoryDto>>>
  | PutEffect<
      ReturnType<typeof getCategoriesSuccess | typeof getCategoriesFailure>
    >,
  void,
  ApiResult<PaginatedList<CategoryDto>>
> {
  try {
    const { page, pageSize } = action.payload;
    const response = yield call(getCategories, page, pageSize);
    if (response.success) {
      yield put(getCategoriesSuccess(response.data));
    } else {
      yield put(
        getCategoriesFailure(response.message ?? 'Failed to fetch categories'),
      );
    }
  } catch (error) {
    yield put(
      getCategoriesFailure(
        getErrorMessage(error, 'Failed to fetch category details'),
      ),
    );
  }
}

function* getCategorySaga(
  action: PayloadAction<string>,
): Generator<
  | CallEffect<ApiResult<CategoryDto>>
  | PutEffect<
      ReturnType<typeof getCategorySuccess | typeof getCategoryFailure>
    >,
  void,
  ApiResult<CategoryDto>
> {
  try {
    const response = yield call(getCategory, action.payload);
    yield put(getCategorySuccess(response.data));
  } catch (error) {
    yield put(
      getCategoryFailure(
        getErrorMessage(error, 'Failed to fetch category details'),
      ),
    );
  }
}

function* createCategorySaga(
  action: PayloadAction<CategoryDto>,
): Generator<
  | CallEffect<ApiResult<string>>
  | PutEffect<
      ReturnType<typeof createCategorySuccess | typeof createCategoryFailure>
    >,
  void,
  ApiResult<string>
> {
  try {
    const category = action.payload;
    const response = yield call(createCategory, category);
    yield put(createCategorySuccess(response.data));
  } catch (error) {
    yield put(
      createCategoryFailure(
        getErrorMessage(error, 'Failed to create category'),
      ),
    );
  }
}

function* updateCategorySaga(
  action: PayloadAction<CategoryDto>,
): Generator<
  | CallEffect<ApiResult<string>>
  | PutEffect<
      ReturnType<typeof updateCategorySuccess | typeof updateCategoryFailure>
    >,
  void,
  ApiResult<string>
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
  ApiResult<string>
> {
  try {
    const id = action.payload;
    const response = yield call(deleteCategory, id);
    yield put(deleteCategorySuccess(response.data));
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
