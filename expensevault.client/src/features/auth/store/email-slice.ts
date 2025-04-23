import { createSlice } from '@reduxjs/toolkit';

import { VerifyEmailState } from '../types/verify-email';

const initialState: VerifyEmailState = {
  confirmEmail: {
    data: null,
    status: 'idle',
    error: null,
  },
  verifyEmail: {
    data: null,
    status: 'idle',
    error: null,
  },
};

const emailSlice = createSlice({
  initialState,
  name: 'Verify Email',
  reducers: {},
});
