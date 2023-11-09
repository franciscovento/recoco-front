import { University } from '@/lib/interfaces/university.interface';
import { recocoApi } from '../recocoApi';

const universityModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    getUniversities: builder.query<University[], null>({
      query: () => '/university',
      providesTags: ['University'],
    }),
    getUniversityById: builder.query<University, string>({
      query: (id) => `/university/${id}`,
      providesTags: (result, error, id) => [{ type: 'University', id }],
    }),
    addUniversity: builder.mutation<void, Partial<University>>({
      query: (university) => ({
        url: '/university',
        method: 'POST',
        body: university,
      }),
      invalidatesTags: ['University'],
    }),
    updateUniversity: builder.mutation<void, Partial<University>>({
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
    deleteUniversity: builder.mutation<void, string>({
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
