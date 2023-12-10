import { University } from '@/lib/interfaces/university.interface';
import { recocoApi } from '../recocoApi';

const universityModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    getUniversities: builder.query<
      { message: string; data: University[] },
      void
    >({
      query: () => '/university',
      providesTags: ['University'],
    }),
    getUniversityById: builder.query<
      { message: string; data: University },
      string
    >({
      query: (id) => `/university/${id}`,
      providesTags: (result, error, id) => [{ type: 'University', id }],
    }),
    addUniversity: builder.mutation<
      { message: string; data: University },
      Partial<University>
    >({
      query: (university) => ({
        url: '/university',
        method: 'POST',
        body: university,
      }),
      invalidatesTags: ['University'],
    }),
    updateUniversity: builder.mutation<
      { message: string; data: University },
      Partial<University>
    >({
      query: ({ id, ...rest }) => ({
        url: `/university/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [
        'University',
        { type: 'University', id },
      ],
    }),
    deleteUniversity: builder.mutation<
      { message: string; data: University },
      string
    >({
      query: (id) => ({
        url: `/university/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['University'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUniversitiesQuery,
  useAddUniversityMutation,
  useDeleteUniversityMutation,
  useUpdateUniversityMutation,
  useGetUniversityByIdQuery,
} = universityModel;
