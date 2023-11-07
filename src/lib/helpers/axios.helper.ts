import axios from 'axios';
// import cookies from 'js-cookie';
import { cookies } from 'next/headers'

const cookieStore = cookies()
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = getTokenFromCookies();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  async (resp) => {
    return resp;
  },
  (error) => {
    if (error.response.status === 404) {
      window.location.href = '/not-found';
    }
  }
);

export default instance;

const getTokenFromCookies = () => {
  const token = cookieStore.get('token');
  return token;
};
