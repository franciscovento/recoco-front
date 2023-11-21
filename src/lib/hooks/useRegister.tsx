import { useSignUpMutation } from '@/store/api/recoco/authApi';
import useLogin from './useLogin';
import { useDispatch } from 'react-redux';

const useRegister = () => {
  const { loginToApp } = useLogin();
  const [signUp] = useSignUpMutation();
  const registerAndLogin = async (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        username: data.username,
      }).unwrap();

      const resp = await loginToApp({
        email: data.email,
        password: data.password,
      });

      return resp;
    } catch (error) {
      throw error;
    }
  };
  return {
    registerAndLogin,
  };
};
export default useRegister;
