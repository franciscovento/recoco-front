import { recocoApi } from '../recocoApi';
import { User } from '@/lib/interfaces/user.interface';

const authModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: User },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comment'],
    }),
    signUp: builder.mutation<void, Partial<User>>({
      query: (user) => ({
        url: '/auth/signup',
        method: 'POST',
        body: user,
      }),
      // invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Comment'],
      // invalidatesTags: ['Auth'],
    }),
    me: builder.query<User, void>({
      query: () => '/auth/me',
      // providesTags: ['Auth'],
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
