import { TeacherClass } from '@/lib/interfaces/teacher-class.interface';
import { recocoApi } from '../recocoApi';
import { Comment } from '@/lib/interfaces/comment.interface';

const teacherClassModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherClass: builder.query<
      { message: string; data: TeacherClass },
      { teacher_id: number; course_id: number }
    >({
      query: ({ teacher_id, course_id }) =>
        `/teacher-class/${teacher_id}/${course_id}`,
      providesTags: (result, error, { teacher_id, course_id }) => [
        { type: 'TeacherClass', id: teacher_id },
      ],
    }),
    getTeacherClassByCourse: builder.query<
      { message: string; data: TeacherClass[] },
      number
    >({
      query: (id) => `/teacher-class/by-course/${id}`,
      providesTags: (result, error, id) => [{ type: 'TeacherClass', id }],
    }),
    addTeacherClass: builder.mutation<
      { message: string; data: TeacherClass },
      {
        teacher_name: string;
        last_name: string;
        course_id: number;
        teacher_class_name: string;
        faculty_id: number;
      }
    >({
      query: (teacherClass) => ({
        url: '/teacher-class',
        method: 'POST',
        body: teacherClass,
      }),
      invalidatesTags: ['TeacherClass'],
    }),
    deleteTeacherClass: builder.mutation<
      { message: string; data: TeacherClass },
      { teacher_id: number; course_id: number }
    >({
      query: ({ teacher_id, course_id }) => ({
        url: `/teacher-class/${teacher_id}/${course_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TeacherClass'],
    }),
    getTeacherClassComments: builder.query<
      { message: string; data: Comment[] },
      { teacher_id: number; course_id: number }
    >({
      query: ({ teacher_id, course_id }) =>
        `/teacher-class/${teacher_id}/${course_id}/comments`,
      providesTags: (result, error, { teacher_id, course_id }) => [
        { type: 'Comment', id: teacher_id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTeacherClassByCourseQuery,
  useGetTeacherClassQuery,
  useAddTeacherClassMutation,
  useDeleteTeacherClassMutation,
  useGetTeacherClassCommentsQuery,
} = teacherClassModel;

export default teacherClassModel;
