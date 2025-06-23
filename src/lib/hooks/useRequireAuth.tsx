import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import useLoginRegisterForm from './modals/useLoginRegisterForm';

const userRequireAuth = () => {
  const { showLoginRegisterModal } = useLoginRegisterForm();
  const { isAuthenticated } = useSelector((state: RootState) => state.ui);

  const handleOpenModal = (cb: (anonymous: boolean) => void) => {
    if (!isAuthenticated) {
      showLoginRegisterModal('register', (response) => {
        if (response === 'anonyms') {
          cb(true);
        } else {
          cb(false);
        }
      });
    } else {
      cb(false);
    }
  };
  return {
    handleOpenModal,
  };
};

export { userRequireAuth };
