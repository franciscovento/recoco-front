import { recocoApi } from '../recocoApi';
import { Course } from '@/lib/interfaces/course.interface';

const courseModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourseById: builder.query<Course, string>({
      query: (id) => `/course/${id}`,
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),
    addCourse: builder.mutation<void, Partial<Course>>({
      query: (course) => ({
        url: '/course',
        method: 'POST',
        body: course,
      }),
      invalidatesTags: ['Course'],
    }),
    updateCourse: builder.mutation<void, Partial<Course>>({
      query: ({ id, ...rest }) => ({
        url: `/course/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [
        'Course',
        { type: 'Course', id },
      ],
    }),
    deleteCourse: builder.mutation<void, string>({
      query: (id) => ({
        url: `/course/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCourseByIdQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseModel;
