import { useCallback, useEffect } from 'react';

import { LOGOUT_EVENT } from '../constants/auth';
import { addWindowEventListener } from '../utils/event-util';

import { logout } from '@/features/auth/store/auth-slice';
import { useAppDispatch } from '@/stores/hooks';

const useGlobalEvent = () => {
  const dispatch = useAppDispatch();

  const signOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  useEffect(() => {
    const logOutEventHandler = addWindowEventListener(LOGOUT_EVENT, signOut);
    return () => {
      logOutEventHandler();
    };
  }, [signOut]);
};

export default useGlobalEvent;
