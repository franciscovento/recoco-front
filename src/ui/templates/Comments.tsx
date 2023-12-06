'use client';
import React from 'react';
import { useGetTeacherClassCommentsQuery } from '@/store/api/recoco/teacherClassApi';
import Comment from '../molecules/Comment';

interface Props {
  teacher_id: number;
  course_id: number;
}
const Comments = ({ teacher_id, course_id }: Props) => {
  const { data: comments } = useGetTeacherClassCommentsQuery({
    teacher_id,
    course_id,
  });

  return (
    <div className="flex flex-col gap-7 ">
      {comments?.map((comment, index) => (
        <Comment
          key={index}
          userImage={'/images/characters/default.png'}
          comment={comment.comment}
          commentRating={comment.quality}
          date={comment.created_at}
          dislikes={comment.disLikes}
          likes={comment.likes}
          teacher_id={teacher_id}
          course_id={course_id}
          created_by={comment.created_by}
          isLiked={
            comment.commentLikes.length > 0 && comment.commentLikes[0].is_like
          }
          isDisliked={
            comment.commentLikes.length > 0 && !comment.commentLikes[0].is_like
          }
        />
      ))}
    </div>
  );
};

export default Comments;