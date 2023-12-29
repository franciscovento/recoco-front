import { Comment } from '@/lib/interfaces/comment.interface';
import { recocoApi } from '../recocoApi';
import { LikeResponse } from '@/lib/interfaces/like.interface';

const commentModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation<
      { message: string; data: Comment },
      Partial<Comment>
    >({
      query: (body) => ({
        url: `/comment`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comment', 'TeacherClass'],
    }),
    updateComment: builder.mutation<
      { message: string; data: Comment },
      Partial<Comment>
    >({
      query: (body) => ({
        url: `/comment`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Comment', 'TeacherClass'],
    }),
    deleteComment: builder.mutation<
      { message: string; data: Comment },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/comment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment', 'TeacherClass'],
    }),
    likeComment: builder.mutation<LikeResponse, { comment_id: string }>({
      query: ({ comment_id }) => ({
        url: `/comment/${comment_id}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Comment'],
    }),
    dislikeComment: builder.mutation<
      { message: string; data: { disLike: boolean } },
      { comment_id: string }
    >({
      query: ({ comment_id }) => ({
        url: `/comment/${comment_id}/dislike`,
        method: 'POST',
      }),
      invalidatesTags: ['Comment'],
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
