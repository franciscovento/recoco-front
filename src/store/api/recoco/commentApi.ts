import { Comment } from '@/lib/interfaces/comment.interface';
import { recocoApi } from '../recocoApi';

const commentModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation<void, Partial<Comment>>({
      query: (body) => ({
        url: `/comment/${body.teacher_id}/${body.course_id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comment'],
    }),
    updateComment: builder.mutation<void, Partial<Comment>>({
      query: (body) => ({
        url: `/comment/${body.teacher_id}/${body.course_id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Comment'],
    }),
    deleteComment: builder.mutation<
      void,
      { teacher_id: string; course_id: string }
    >({
      query: ({ teacher_id, course_id }) => ({
        url: `/comment/${teacher_id}/${course_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),
    likeComment: builder.mutation<
      void,
      { teacher_id: string; course_id: string; user_id: string }
    >({
      query: ({ teacher_id, course_id, user_id }) => ({
        url: `/comment/${teacher_id}/${course_id}/${user_id}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Comment'],
    }),
    dislikeComment: builder.mutation<
      void,
      { teacher_id: string; course_id: string; user_id: string }
    >({
      query: ({ teacher_id, course_id, user_id }) => ({
        url: `/comment/${teacher_id}/${course_id}/${user_id}/dislike`,
        method: 'POST',
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
  overrideExisting: false,
});

export const { useAddCommentMutation } = commentModel;
