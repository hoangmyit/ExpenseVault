import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICategoryGroupState } from '../types/category-group.type';

import { CategoryGroupResponse } from '@/shared/types/backend/category-group';
import { RootState } from '@/stores/store';

const initialState: ICategoryGroupState = {
  categoryGroup: {
    data: [],
    error: null,
    status: 'idle',
  },
};

const categoryGroupSlice = createSlice({
  name: 'categoryGroup',
  initialState,
  reducers: {
    getCategoryGroupsRequest: (state) => {
      state.categoryGroup.status = 'loading';
      state.categoryGroup.error = null;
    },
    getCategoryGroupsSuccess: (
      state,
      action: PayloadAction<CategoryGroupResponse[]>,
    ) => {
      state.categoryGroup.data = action.payload;
      state.categoryGroup.status = 'succeeded';
    },
    getCategoryGroupsFailure: (state, action: PayloadAction<string>) => {
      state.categoryGroup.status = 'failed';
      state.categoryGroup.error = action.payload;
    },
  },
});

export const {
  getCategoryGroupsRequest,
  getCategoryGroupsSuccess,
  getCategoryGroupsFailure,
} = categoryGroupSlice.actions;
export default categoryGroupSlice.reducer;

export const CategoryGroupState = (state: RootState) =>
  state.categoryGroup.categoryGroup;
