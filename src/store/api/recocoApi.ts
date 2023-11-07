import { University } from "@/lib/interfaces/university.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie'


export const recocoApi = createApi({
  reducerPath: "recocoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('authToken');
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["University", "Country"],
  endpoints: (builder) => ({
    getCountries: builder.query<{ id: number; name: string }[], void>({
      query: () => "/country",
      providesTags: ["Country"],
    }),
    getUniversities: builder.query<University[], null>({
      query: () => "/university",
      providesTags: ["University"],
    }),
    getUniversityById: builder.query<University, number>({
      query: ( id ) => `/university/${id}`,
      providesTags: (result, error, id) => [{ type: 'University', id }],
    }),
    addUniversity: builder.mutation<void, Partial<University>>({
      query: (university) => ({
        url: '/university',
        method: 'POST',
        body: university
      }),
      invalidatesTags: ["University"],
    }),
    updateUniversity: builder.mutation<void, Partial<University>>({
      query: ({id, ...rest}) => ({
        url: `/university/${id}`,
        method: 'PATCH',
        body: rest
      }),
      invalidatesTags: (result, error, { id }) => ["University",{ type: 'University', id }],
    }),
    deleteUniversity: builder.mutation<void, string>({
      query: (id) => ({
        url: `/university/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["University"],
    })
  }),
});

export const { 
  useGetUniversitiesQuery, 
  useGetUniversityByIdQuery, 
  useAddUniversityMutation, 
  useUpdateUniversityMutation, 
  useDeleteUniversityMutation,
  useGetCountriesQuery,
} = recocoApi;