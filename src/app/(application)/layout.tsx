'use client';
import { useMeQuery } from '@/store/api/recoco/authApi';
import { uiActions } from '@/store/slices/ui';
import Header from '@/ui/organisms/Header';
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
      dispatch(uiActions.setUserMe(me));
      dispatch(uiActions.setAuthState(true));
    }
  }, [me]);

  return (
    <>
      <Header />
      <main className="bg-app-background">{children}</main>
    </>
  );
}
