import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { recocoApi } from '../recocoApi';
import { User } from '@/lib/interfaces/user.interface';

const authModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { message: string; data: { token: string; user: User } },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comment'],
      transformResponse: (
        baseQueryReturnValue: {
          message: string;
          data: { token: string; user: User };
        },
        meta: FetchBaseQueryMeta,
        arg: { email: string; password: string }
      ) => {
        localStorage.setItem('auth_token', baseQueryReturnValue.data.token);
        return baseQueryReturnValue;
      },
    }),
    signUp: builder.mutation<
      {
        message: string;
        data: { username: string; email: string; profile_img: string };
      },
      Partial<User>
    >({
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
      transformResponse: (
        baseQueryReturnValue: { message: string },
        meta: FetchBaseQueryMeta,
        arg: void
      ) => {
        localStorage.removeItem('auth_token');
        return baseQueryReturnValue;
      },
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: '/auth/request-reset-password',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<
      { message: string },
      { code: string; password: string }
    >({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body,
      }),
    }),
    me: builder.query<{ message: string; data: User }, void>({
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authModel;
