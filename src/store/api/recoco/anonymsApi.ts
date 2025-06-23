import { Comment } from '@/lib/interfaces/comment.interface';
import { recocoApi } from '../recocoApi';
import { TeacherClass } from '@/lib/interfaces/teacher-class.interface';
import { Resource } from '@/lib/interfaces/resource.interface';

const anonymsModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    addAnonymsResource: builder.mutation<
      { message: string; data: Resource },
      Partial<Resource>
    >({
      query: ({ teacher_id, course_id, ...rest }) => ({
        url: `/anonyms/teacher-class/resource`,
        method: 'POST',
        body: {
          teacher_id,
          course_id,
          ...rest,
        },
      }),
      invalidatesTags: (result, error, { teacher_id, course_id }) => [
        {
          type: 'TeacherClassResource',
          id: `${teacher_id}-${course_id}`,
        },
      ],
    }),
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
  useAddAnonymsResourceMutation,
} = anonymsModel;
