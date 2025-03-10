import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '../features/auth/store/auth-slice';
import categoryReducer from '../features/category/store/category-slice';

const rootReducer = combineReducers({
  category: categoryReducer,
  auth: authReducer,
});

export default rootReducer;
