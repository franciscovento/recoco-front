// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { User } from '@/lib/interfaces/user.interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
// initialize an empty api service that we'll inject endpoints into later as needed
export const recocoApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = Cookies.get('authToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'University',
    'Country',
    'Faculty',
    'Degree',
    'Course',
    'Auth',
    'TeacherClass',
    'Comment',
  ],
  endpoints: (builder) => ({
    getCountries: builder.query<{ id: number; name: string }[], void>({
      query: () => '/country',
      providesTags: ['Country'],
    }),
  }),
});

export const { useGetCountriesQuery } = recocoApi;
