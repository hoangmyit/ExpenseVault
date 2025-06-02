import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '@/features/auth/store/auth-slice';
import { permissionReducer } from '@/features/auth/store/permission-slice';
import { verifyEmailReducer } from '@/features/auth/store/verify-email-slice';
import categoryReducer from '@/features/category/store/category-slice';
import categoryGroupReducer from '@/features/category-group/store/category-group-slice';

const rootReducer = combineReducers({
  category: categoryReducer,
  auth: authReducer,
  permission: permissionReducer,
  verifyEmail: verifyEmailReducer,
  categoryGroup: categoryGroupReducer,
});

export default rootReducer;
