import { Comment } from '@/lib/interfaces/comment.interface';
import { recocoApi } from '../recocoApi';
import { LikeResponse } from '@/lib/interfaces/like.interface';

const commentModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation<void, Partial<Comment>>({
      query: (body) => ({
        url: `/comment/${body.teacher_id}/${body.course_id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comment', 'TeacherClass'],
    }),
    updateComment: builder.mutation<void, Partial<Comment>>({
      query: (body) => ({
        url: `/comment/${body.teacher_id}/${body.course_id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Comment', 'TeacherClass'],
    }),
    deleteComment: builder.mutation<
      void,
      { teacher_id: number; course_id: number }
    >({
      query: ({ teacher_id, course_id }) => ({
        url: `/comment/${teacher_id}/${course_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment', 'TeacherClass'],
    }),
    likeComment: builder.mutation<
      LikeResponse,
      { teacher_id: number; course_id: number; user_id: string }
    >({
      query: ({ teacher_id, course_id, user_id }) => ({
        url: `/comment/${teacher_id}/${course_id}/${user_id}/like`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { teacher_id, course_id }) => [
        { type: 'Comment', id: teacher_id },
      ],
    }),
    dislikeComment: builder.mutation<
      { message: string; dislike: boolean },
      { teacher_id: number; course_id: number; user_id: string }
    >({
      query: ({ teacher_id, course_id, user_id }) => ({
        url: `/comment/${teacher_id}/${course_id}/${user_id}/dislike`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { teacher_id, course_id }) => [
        { type: 'Comment', id: teacher_id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddCommentMutation,
  useLikeCommentMutation,
  useDislikeCommentMutation,
  useDeleteCommentMutation,
} = commentModel;
