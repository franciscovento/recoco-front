import { DegreeCourse } from '@/lib/interfaces/degree.interface';
import { recocoApi } from '../recocoApi';
import { Course } from '@/lib/interfaces/course.interface';

const courseModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourseById: builder.query<Course, string>({
      query: (id) => `/course/${id}`,
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),
    getCourseByDegree: builder.query<DegreeCourse[], string>({
      query: (id) => `/course/degree_id/${id}`,
      providesTags: (result, error, id) => ['Course', { type: 'Course', id }],
    }),
    addWithDegreeCourse: builder.mutation<
      void,
      {
        name: string;
        course_code: string;
        faculty_id: number;
        degree_id: number;
      }
    >({
      query: (course) => ({
        url: '/course/with-degree',
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
    deleteCourse: builder.mutation<void, number>({
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
  useAddWithDegreeCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetCourseByDegreeQuery,
} = courseModel;
