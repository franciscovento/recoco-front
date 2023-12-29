import { Comment } from '@/lib/interfaces/comment.interface';
import { recocoApi } from '../recocoApi';
import { TeacherClass } from '@/lib/interfaces/teacher-class.interface';

const anonymsModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    addAnonymsComment: builder.mutation<
      { message: string; data: Comment },
      Partial<Comment>
    >({
      query: (body) => ({
        url: `/anonyms/comment`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comment', 'TeacherClass'],
    }),
    addAnonymsTeacherClass: builder.mutation<
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
        url: '/anonyms/teacher-class',
        method: 'POST',
        body: teacherClass,
      }),
      invalidatesTags: ['TeacherClass'],
    }),
    addAnonymsWithDegreeCourse: builder.mutation<
      void,
      {
        name: string;
        course_code: string;
        faculty_id: number;
        degree_id: number;
      }
    >({
      query: (course) => ({
        url: '/anonyms/course/with-degree',
        method: 'POST',
        body: course,
      }),
      invalidatesTags: ['Course'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddAnonymsCommentMutation,
  useAddAnonymsTeacherClassMutation,
  useAddAnonymsWithDegreeCourseMutation,
} = anonymsModel;
