import { takeLatest } from 'redux-saga/effects';

import {
  getCategoryGroupsFailure,
  getCategoryGroupsRequest,
  getCategoryGroupsSuccess,
} from './category-group-slice';

import { getCategoryGroupService } from '@/core/api/endpoints/category-group.service';
import { CategoryGroupResponse } from '@/shared/types/backend/category-group';
import { getLangText } from '@/shared/utils/language-util';
import { handleApiCall } from '@/shared/utils/saga-util';

function* getCategoryGroupSaga() {
  yield* handleApiCall(
    getCategoryGroupService,
    undefined,
    (data: CategoryGroupResponse[]) => getCategoryGroupsSuccess(data),
    (error) => getCategoryGroupsFailure(error),
    {
      pending: getLangText('categoryGroup:toast.getCategoryGroup.pending'),
      error: getLangText('categoryGroup:toast.getCategoryGroup.error'),
      success: getLangText('categoryGroup:toast.getCategoryGroup.success'),
      useToastPromise: true,
    },
  );
}

export function* categoryGroupSaga() {
  yield takeLatest(getCategoryGroupsRequest.type, getCategoryGroupSaga);
}
