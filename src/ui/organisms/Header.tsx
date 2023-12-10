import Image from 'next/image';
import React from 'react';
import Button from '../atoms/Button';
import { useLogoutMutation } from '@/store/api/recoco/authApi';
import { uiActions } from '@/store/slices/ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import useLoginModal from '@/lib/hooks/useLoginModal';
import Link from 'next/link';

const Header = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.ui);
  const { loginRegisterModal } = useLoginModal();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    if (!isAuthenticated) {
      return loginRegisterModal();
    }
    try {
      await logout();
      dispatch(uiActions.setAuthState(false));
      dispatch(uiActions.setUserMe(null));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="bg-white shadow-app-card flex items-center justify-between px-4 h-[67px]">
      <div className="flex items-center gap-2">
        <Image src={'/svg/recoco.svg'} width={31} height={28} alt="logo" />
        <Link href={`/`}>
          <strong>RECOCO</strong> | Sistemas
        </Link>
      </div>
      <Button onClick={handleLogout} className="w-28 sm:w-36">
        {isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}
      </Button>
    </header>
  );
};

export default Header;
