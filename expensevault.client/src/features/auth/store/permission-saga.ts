import { takeLatest } from 'redux-saga/effects';

import { getPermissionsService } from '../services/permission.service';

import {
  getPermissionsFailure,
  getPermissionsRequest,
  getPermissionsSuccess,
} from './permission-slice';

import { handleApiCall } from '@/shared/utils/saga-util';

function* retrievePermissions() {
  yield* handleApiCall(
    getPermissionsService,
    null,
    (data: string[]) => getPermissionsSuccess(data),
    (error) => getPermissionsFailure(error),
    null,
  );
}

function* permissionSaga() {
  yield takeLatest(getPermissionsRequest.type, retrievePermissions);
}

export default permissionSaga;
