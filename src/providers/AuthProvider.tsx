'use client';
import { useMeQuery } from '@/store/api/recoco/authApi';
import { uiActions } from '@/store/slices/ui';
import { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  children: React.ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const { data: me, isLoading } = useMeQuery();

  useEffect(() => {
    if (me?.data) {
      dispatch(uiActions.setUserMe(me.data));
      dispatch(uiActions.setAuthState(true));
    } else if (!isLoading) {
      dispatch(uiActions.setAuthState(false));
    }
  }, [me, isLoading, dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
