import { recocoApi } from '../recocoApi';
import { Faculty } from '@/lib/interfaces/faculty.interface';

const facultyModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    getFacultyByUniversity: builder.query<
      { message: string; data: Faculty[] },
      string
    >({
      query: (id) => `/faculty/by-university/${id}`,
      providesTags: (result, error, id) => [{ type: 'Faculty', id: id }],
    }),
    getFacultyById: builder.query<{ message: string; data: Faculty }, string>({
      query: (id) => `/faculty/${id}`,
      providesTags: (result, error, id) => [{ type: 'Faculty', id }],
    }),
    addFaculty: builder.mutation<
      { message: string; data: Faculty },
      Partial<Faculty>
    >({
      query: (Faculty) => ({
        url: '/faculty',
        method: 'POST',
        body: Faculty,
      }),
      invalidatesTags: ['Faculty'],
    }),
    updateFaculty: builder.mutation<
      { message: string; data: Faculty },
      Partial<Faculty>
    >({
      query: ({ id, ...rest }) => ({
        url: `/faculty/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [
        'Faculty',
        { type: 'Faculty', id },
      ],
    }),
    deleteFaculty: builder.mutation<{ message: string; data: Faculty }, string>(
      {
        query: (id) => ({
          url: `/faculty/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Faculty'],
      }
    ),
  }),
  overrideExisting: false,
});

export const {
  useAddFacultyMutation,
  useDeleteFacultyMutation,
  useGetFacultyByUniversityQuery,
  useGetFacultyByIdQuery,
  useUpdateFacultyMutation,
} = facultyModel;
