import LoginRegisterModal from '@/ui/organisms/modals/LoginRegisterModal';
import React from 'react';
import { appModal } from '../services/modal.service';
import useRegister from './useRegister';
import useLogin from './useLogin';

const useLoginModal = () => {
  const { registerAndLogin } = useRegister();
  const { loginToApp } = useLogin();
  // const [signUp] = useSignUpMutation();
  const loginRegisterModal = () => {
    appModal.fire({
      html: <LoginRegisterModal signUp={registerAndLogin} login={loginToApp} />,
      width: 780,
    });
  };

  return {
    loginRegisterModal,
  };
};

export default useLoginModal;
