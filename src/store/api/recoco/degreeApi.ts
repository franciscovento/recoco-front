import { Degree } from '@/lib/interfaces/degree.interface';
import { recocoApi } from '../recocoApi';

const degreeModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    getDegreeById: builder.query<Degree, number>({
      query: (id) => `/degree/${id}`,
      providesTags: (result, error, id) => [{ type: 'Degree', id }],
    }),
    addDegree: builder.mutation<void, Partial<Degree>>({
      query: (Degree) => ({
        url: '/degree',
        method: 'POST',
        body: Degree,
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
  useDeleteDegreeMutation,
  useUpdateDegreeMutation,
  useAddDegreeMutation,
} = degreeModel;
