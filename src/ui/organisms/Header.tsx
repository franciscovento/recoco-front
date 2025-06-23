import Image from 'next/image';
import React from 'react';
import Button from '../atoms/Button';
import { useLogoutMutation } from '@/store/api/recoco/authApi';
import { uiActions } from '@/store/slices/ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import useLoginModal from '@/lib/hooks/useLoginModal';
import Link from 'next/link';
import useAppNotification from '@/lib/hooks/modals/useAppNotification';

const Header = () => {
  const { notification, confirm } = useAppNotification();
  const { isAuthenticated } = useSelector((state: RootState) => state.ui);

  const { loginRegisterModal } = useLoginModal();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    if (!isAuthenticated) {
      return loginRegisterModal('login');
    } else {
      confirm({
        title: 'Cerrar sesión',
        content: '¿Estás seguro de querer cerrar sesión?',
        onOk: async () => {
          try {
            await logout();
            dispatch(uiActions.setAuthState(false));
            dispatch(uiActions.setUserMe(null));
            notification({
              type: 'success',
              message: 'Has cerrado sesión correctamente',
            });
          } catch (error) {
            notification({
              type: 'error',
              message: 'Error al cerrar sesión',
            });
          }
        },
      });
    }
  };
  return (
    <header className="bg-white shadow-app-card flex items-center justify-between px-4 h-[67px]">
      <div className="flex items-center gap-2">
        <Image src={'/svg/recoco.svg'} width={31} height={28} alt="logo" />
        <Link href={`/`}>
          <strong>RECOCO</strong>
        </Link>
      </div>
      <Button onClick={handleLogout} className="w-28 sm:w-36">
        {isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}
      </Button>
    </header>
  );
};

export default Header;
