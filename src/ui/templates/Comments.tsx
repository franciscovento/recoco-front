'use client';
import React from 'react';
import { useGetTeacherClassCommentsQuery } from '@/store/api/recoco/teacherClassApi';
import Comment from '../molecules/Comment';
import CommentsSkeleton from '../atoms/skeletons/CommentsSkeleton';

interface Props {
  teacher_id: number;
  course_id: number;
}
const Comments = ({ teacher_id, course_id }: Props) => {
  const { data: commentsResponse, isLoading } = useGetTeacherClassCommentsQuery(
    {
      teacher_id,
      course_id,
    }
  );

  const comments = commentsResponse?.data;

  return (
    <div className="flex flex-col gap-7 ">
      {!isLoading ? (
        comments?.map((comment, index) => (
          <Comment
            key={index}
            id={comment.id}
            userImage={
              comment.user.profile_img || '/images/characters/default.png'
            }
            userName={comment.user.username}
            comment={comment.comment}
            commentRating={comment.quality}
            date={comment.created_at}
            dislikes={comment.disLikes}
            likes={comment.likes}
            created_by={comment.created_by}
            isLiked={
              comment.commentLikes.length > 0 && comment.commentLikes[0].is_like
            }
            isDisliked={
              comment.commentLikes.length > 0 &&
              !comment.commentLikes[0].is_like
            }
          />
        ))
      ) : (
        <CommentsSkeleton />
      )}
    </div>
  );
};

export default Comments;
