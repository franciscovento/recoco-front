import React, { FC, useState } from 'react';
import { useAppModal } from '../useAppModal';
import { RegisterForm } from '@/ui/organisms/forms/RegisterForm';
import { LoginForm } from '@/ui/organisms/forms/LoginForm';

export type LoginRegisterFormType = 'login' | 'register';
export type LoginRegisterFormSuccess = 'login' | 'register' | 'anonyms';

const useLoginRegisterForm = () => {
  const { appModal } = useAppModal();

  const showLoginRegisterModal = (
    type: LoginRegisterFormType = 'register',
    onLoginRegisterSuccess?: (response: LoginRegisterFormSuccess) => void
  ) => {
    const instance = appModal({
      content: (
        <LoginRegisterForm
          onLoginRegisterSuccess={(response) => {
            onLoginRegisterSuccess?.(response);
            instance.destroy();
          }}
          type={type}
        />
      ),
      footer: null,
      styles: {
        content: {
          padding: 0,
        },
      },
    });
  };
  return {
    showLoginRegisterModal,
  };
};

export default useLoginRegisterForm;

interface LoginRegisterFormProps {
  onLoginRegisterSuccess?: (response: LoginRegisterFormSuccess) => void;
  type: LoginRegisterFormType;
}
const LoginRegisterForm: FC<LoginRegisterFormProps> = ({
  onLoginRegisterSuccess,
  type,
}) => {
  const [modalType, setModalType] = useState<'login' | 'register'>(type);

  return (
    <div>
      {modalType === 'login' ? (
        <LoginForm
          setModalType={setModalType}
          onLoginRegisterSuccess={onLoginRegisterSuccess}
        />
      ) : (
        <RegisterForm
          setModalType={setModalType}
          onLoginRegisterSuccess={onLoginRegisterSuccess}
        />
      )}
    </div>
  );
};
