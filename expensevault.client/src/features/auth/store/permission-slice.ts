import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPermissionState } from '../types/permission.type';

import { toastError } from '@/shared/components/feedback/toast/toast';
import { RootState } from '@/stores/store';

const initialState: IPermissionState = {
  status: 'idle',
  error: null,
  data: [],
};

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    getPermissionsRequest: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    getPermissionsSuccess: (state, action: PayloadAction<string[]>) => {
      state.status = 'succeeded';
      state.data = action.payload;
    },
    getPermissionsFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
      toastError(action.payload);
    },
  },
});

export const {
  getPermissionsRequest,
  getPermissionsSuccess,
  getPermissionsFailure,
} = permissionSlice.actions;

export const permissionReducer = permissionSlice.reducer;
export const PermissionState = (state: RootState) => state.permission;
