import { useSignUpMutation } from '@/store/api/recoco/authApi';
import useLogin from './useLogin';

const useRegister = () => {
  const { loginToApp } = useLogin();
  const [signUp] = useSignUpMutation();
  const registerAndLogin = async (data: {
    email: string;
    password: string;
    username: string;
    profile_img: string;
  }) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        username: data.username,
        profile_img: data.profile_img,
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
