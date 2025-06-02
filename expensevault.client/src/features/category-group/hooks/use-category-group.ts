import { useCallback } from 'react';

import {
  CategoryGroupState,
  getCategoryGroupsRequest,
} from '../store/category-group-slice';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';

export const useCategoryGroup = () => {
  const dispatch = useAppDispatch();
  const categoryGroupState = useAppSelector(CategoryGroupState);

  const getCategoryGroup = useCallback(() => {
    dispatch(getCategoryGroupsRequest());
  }, [dispatch]);
  return {
    categoryGroupData: categoryGroupState.data,
    categoryGroupStatus: categoryGroupState.status,
    getCategoryGroup,
  };
};
// This hook can be expanded in the future to include state management, API calls, etc.
