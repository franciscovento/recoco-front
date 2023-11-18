import Image from 'next/image';
import React from 'react';
import Button from '../atoms/Button';
import { useLogoutMutation } from '@/store/api/recoco/authApi';
import { uiActions } from '@/store/slices/ui';
import { useDispatch } from 'react-redux';

const Header = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const handleLogout = async () => {
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
        <span>
          <strong>RECOCO</strong> | Sistemas
        </span>
      </div>
      <Button onClick={handleLogout} className="w-28 sm:w-36">
        Ingresar
      </Button>
    </header>
  );
};

export default Header;
