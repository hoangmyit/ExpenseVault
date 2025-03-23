import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getPermissionsRequest,
  PermissionState,
} from '../store/permission-slice';

const usePermission = () => {
  const dispatch = useDispatch();
  const permissions = useSelector(PermissionState);
  const getPermissions = useCallback(
    () => dispatch(getPermissionsRequest()),
    [dispatch],
  );

  return {
    permissions: permissions.data,
    status: permissions.status,
    getPermissions,
  };
};

export default usePermission;
