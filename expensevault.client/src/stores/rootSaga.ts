import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';

import { categorySaga } from '../pages/category/store/category-saga';

export default function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(categorySaga)]);
}
