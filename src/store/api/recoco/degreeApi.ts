import { Degree } from '@/lib/interfaces/degree.interface';
import { recocoApi } from '../recocoApi';

const degreeModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    getDegreeById: builder.query<{ message: string; data: Degree }, string>({
      query: (id) => `/degree/${id}`,
      providesTags: (result, error, id) => [{ type: 'Degree', id }],
    }),
    getDegreeByFaculty: builder.query<
      { message: string; data: Degree[] },
      string
    >({
      query: (id) => `/degree/by-faculty/${id}`,
      providesTags: (result, error, id) => [{ type: 'Degree', id }],
    }),
    addDegree: builder.mutation<
      { message: string; data: Degree },
      Partial<Degree>
    >({
      query: (degree) => ({
        url: '/degree',
        method: 'POST',
        body: degree,
      }),
      invalidatesTags: ['Degree'],
    }),
    deleteDegreeCourse: builder.mutation<
      { message: string; data: Degree },
      { degree_id: number; course_id: number }
    >({
      query: (data) => ({
        url: `/degree/${data.degree_id}/remove-degree-course/${data.course_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),

    updateDegree: builder.mutation<
      { message: string; data: Degree },
      Partial<Degree>
    >({
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
    deleteDegree: builder.mutation<{ message: string; data: Degree }, string>({
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
  useDeleteDegreeCourseMutation,
  endpoints,
} = degreeModel;
