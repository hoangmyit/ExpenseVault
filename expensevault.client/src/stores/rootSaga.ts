import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';

import authSaga from '../features/auth/store/auth-saga';
import { categorySaga } from '../features/category/store/category-saga';

export default function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(categorySaga), fork(authSaga)]);
}
