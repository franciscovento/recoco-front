import { Degree } from '@/lib/interfaces/degree.interface';
import { recocoApi } from '../recocoApi';

const degreeModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    getDegreeById: builder.query<Degree, string>({
      query: (id) => `/degree/${id}`,
      providesTags: (result, error, id) => [{ type: 'Degree', id }],
    }),
    getDegreeByFaculty: builder.query<Degree[], string>({
      query: (id) => `/degree/by-faculty/${id}`,
      providesTags: (result, error, id) => [{ type: 'Degree', id }],
    }),
    addDegree: builder.mutation<void, Partial<Degree>>({
      query: (degree) => ({
        url: '/degree',
        method: 'POST',
        body: degree,
      }),
      invalidatesTags: ['Degree'],
    }),
    updateDegree: builder.mutation<void, Partial<Degree>>({
      query: ({ id, ...rest }) => ({
        url: `/degree/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [
        'Degree',
        { type: 'Degree', id },
      ],
    }),
    deleteDegree: builder.mutation<void, string>({
      query: (id) => ({
        url: `/degree/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Degree'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDegreeByIdQuery,
  useGetDegreeByFacultyQuery,
  useDeleteDegreeMutation,
  useUpdateDegreeMutation,
  useAddDegreeMutation,
} = degreeModel;
