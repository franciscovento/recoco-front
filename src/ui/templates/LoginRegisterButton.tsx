'use client';
import useLoginRegisterForm from '@/lib/hooks/modals/useLoginRegisterForm';
import { Button, ButtonProps } from 'antd';

import React, { FC } from 'react';

interface Props extends ButtonProps {
  modalType: 'login' | 'register';
}
const LoginRegisterButton: FC<Props> = ({ modalType, children, ...rest }) => {
  const { showLoginRegisterModal } = useLoginRegisterForm();
  return (
    <Button {...rest} onClick={() => showLoginRegisterModal(modalType)}>
      {children}
    </Button>
  );
};

export default LoginRegisterButton;
