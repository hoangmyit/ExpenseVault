import { combineReducers } from '@reduxjs/toolkit';
import categoryReducer from '../pages/category/store/category-slice';

const rootReducer = combineReducers({
  category: categoryReducer,
});

export default rootReducer;
