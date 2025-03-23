import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '@/features/auth/store/auth-slice';
import { permissionReducer } from '@/features/auth/store/permission-slice';
import categoryReducer from '@/features/category/store/category-slice';

const rootReducer = combineReducers({
  category: categoryReducer,
  auth: authReducer,
  permission: permissionReducer,
});

export default rootReducer;
