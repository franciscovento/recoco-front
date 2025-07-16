// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// initialize an empty api service that we'll inject endpoints into later as needed
export const recocoApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
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
    'TeacherClassResource',
    'Resource',
    'Chatbot',
  ],
  endpoints: (builder) => ({
    getCountries: builder.query<
      { message: string; data: { id: number; name: string }[] },
      void
    >({
      query: () => '/country',
      providesTags: ['Country'],
    }),
  }),
});

export const { useGetCountriesQuery } = recocoApi;
