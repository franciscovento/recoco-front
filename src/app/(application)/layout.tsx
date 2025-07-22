'use client';
import { useMeQuery } from '@/store/api/recoco/authApi';
import { uiActions } from '@/store/slices/ui';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function ApplicationLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { data: me } = useMeQuery();

  useEffect(() => {
    if (me) {
      dispatch(uiActions.setUserMe(me.data));
      dispatch(uiActions.setAuthState(true));
    }
  }, [me]);

  return <>{children}</>;
}
