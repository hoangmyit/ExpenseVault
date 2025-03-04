import { combineReducers } from '@reduxjs/toolkit';

import categoryReducer from '../pages/category/store/category-slice';
import { authReducer } from '../pages/sign-in/store/auth-slice';

const rootReducer = combineReducers({
  category: categoryReducer,
  auth: authReducer,
});

export default rootReducer;
