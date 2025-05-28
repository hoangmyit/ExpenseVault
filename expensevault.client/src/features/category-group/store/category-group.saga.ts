import { takeLatest } from 'redux-saga/effects';

import {
  getCategoryGroupsFailure,
  getCategoryGroupsRequest,
  getCategoryGroupsSuccess,
} from './category-group-slice';

import { getCategoryGroupService } from '@/core/api/endpoints/category-group.service';
import { CategoryGroupResponse } from '@/shared/types/backend/category-group';
import { handleApiCall } from '@/shared/utils/saga-util';

function* getCategoryGroupSaga() {
  yield* handleApiCall(
    getCategoryGroupService,
    undefined,
    (data: CategoryGroupResponse[]) => getCategoryGroupsSuccess(data),
    (error) => getCategoryGroupsFailure(error),
    {
      pending: 'Loading category groups...',
      error: 'Failed to load category groups.',
      success: 'Category groups loaded successfully.',
      useToastPromise: true,
    },
  );
}

export function* categoryGroupSaga() {
  yield takeLatest(getCategoryGroupsRequest.type, getCategoryGroupSaga);
}
