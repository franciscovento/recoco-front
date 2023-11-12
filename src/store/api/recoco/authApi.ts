import { recocoApi } from '../recocoApi';
import { User } from '@/lib/interfaces/user.interface';

const authModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { message: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation<void, Partial<User>>({
      query: (user) => ({
        url: '/auth/signup',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    me: builder.query<User, void>({
      query: () => '/auth/me',
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useSignUpMutation,
} = authModel;
