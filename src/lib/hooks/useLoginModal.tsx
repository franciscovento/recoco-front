import LoginRegisterModal from '@/ui/organisms/modals/LoginRegisterModal';
import React from 'react';
import { appModal } from '../services/modal.service';
import useRegister from './useRegister';
import useLogin from './useLogin';

const useLoginModal = () => {
  const { registerAndLogin } = useRegister();
  const { loginToApp } = useLogin();
  // const [signUp] = useSignUpMutation();
  const loginRegisterModal = (defaultView: 'login' | 'register' = 'login') => {
    appModal.fire({
      html: (
        <LoginRegisterModal
          signUp={registerAndLogin}
          login={loginToApp}
          defaultIsLogin={defaultView === 'login' ? true : false}
        />
      ),
      width: 780,
    });
  };

  return {
    loginRegisterModal,
  };
};

export default useLoginModal;
