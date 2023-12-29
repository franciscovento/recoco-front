import LoginRegisterModal from '@/ui/organisms/modals/LoginRegisterModal';
import React from 'react';
import { appModal } from '../services/modal.service';
import useRegister from './useRegister';
import useLogin from './useLogin';

const useLoginModal = () => {
  type ResponseModal = 'anonyms' | 'login' | 'denied';
  const { registerAndLogin } = useRegister();
  const { loginToApp } = useLogin();
  const loginRegisterModal = async (
    defaultView: 'login' | 'register' = 'login'
  ): Promise<ResponseModal> => {
    return appModal
      .fire({
        html: (
          <LoginRegisterModal
            signUp={registerAndLogin}
            login={loginToApp}
            defaultIsLogin={defaultView === 'login' ? true : false}
          />
        ),
        width: 780,
      })
      .then((result): ResponseModal => {
        if (result.isConfirmed) {
          return 'login';
        }
        if (result.isDenied) {
          return 'anonyms';
        }
        return 'denied';
      });
  };

  return {
    loginRegisterModal,
  };
};

export default useLoginModal;
