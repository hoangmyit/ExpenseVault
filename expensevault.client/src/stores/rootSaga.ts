import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';

import { categorySaga } from '../pages/category/store/category-saga';
import authSaga from '../pages/sign-in/store/auth-saga';

export default function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(categorySaga), fork(authSaga)]);
}
