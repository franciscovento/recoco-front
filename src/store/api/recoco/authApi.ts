import { recocoApi } from '../recocoApi';
import { User } from '@/lib/interfaces/user.interface';

const authModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<{ message: string }, null>({
      query: () => `/auth/login`,
      providesTags: ['Auth'],
    }),
    signUp: builder.mutation<void, Partial<User>>({
      query: (user) => ({
        url: '/auth/signup',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation<void, null>({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    me: builder.query<void, User>({
      query: () => ({
        url: `auth/me`,
      }),
      providesTags: ['Auth'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginQuery,
  useLogoutMutation,
  useMeQuery,
  useSignUpMutation,
} = authModel;
