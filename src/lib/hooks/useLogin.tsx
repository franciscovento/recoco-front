import { useLoginMutation } from '@/store/api/recoco/authApi';
import { uiActions } from '@/store/slices/ui';
import { useDispatch } from 'react-redux';

const useLogin = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const loginToApp = async (data: { email: string; password: string }) => {
    try {
      const resp = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(uiActions.setUserMe(resp.user));
      dispatch(uiActions.setAuthState(true));
      return resp;
    } catch (error) {
      throw error;
    }
  };

  return {
    loginToApp,
  };
};

export default useLogin;
