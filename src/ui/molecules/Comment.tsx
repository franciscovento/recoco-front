'use client';
import Image from 'next/image';
import React from 'react';
import Rating from './Rating';
import LikeButton from '../atoms/LikeButton';
import { getUTCStringDate } from '@/lib/helpers/formatDate.helper';
import {
  useDislikeCommentMutation,
  useLikeCommentMutation,
} from '@/store/api/recoco/commentApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { failedNotification } from '@/lib/services/notification.service';

interface Props {
  userImage: string;
  commentRating: number;
  date: string;
  comment: string;
  likes: number;
  dislikes: number;
  teacher_id: number;
  course_id: number;
  userId: string;
  isLiked?: boolean;
  isDisliked?: boolean;
}
const Comment = ({
  comment,
  commentRating,
  date,
  dislikes,
  likes,
  userId,
  teacher_id,
  course_id,
  userImage,
  isLiked = false,
  isDisliked = false,
}: Props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.ui);
  const [likeComment] = useLikeCommentMutation();
  const [dislikeComment] = useDislikeCommentMutation();

  const like = async () => {
    if (!isAuthenticated) {
      return failedNotification('Necesitas iniciar sesión');
    }
    try {
      const resp = await likeComment({
        teacher_id,
        course_id,
        user_id: userId,
      }).unwrap();
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const dislike = async () => {
    if (!isAuthenticated) {
      return failedNotification('Necesitas iniciar sesión');
    }
    try {
      const resp = await dislikeComment({
        teacher_id,
        course_id,
        user_id: userId,
      }).unwrap();
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const commentDate = new Date(date);

  return (
    <div className="border-t-2 border-[#E8E8EC]">
      <div className="flex items-center justify-between pt-4">
        <Image src={userImage} width={30} height={30} alt="" />
        <div className="text-right">
          <Rating value={commentRating} readonly />
          <span className="text-xs">{getUTCStringDate(commentDate)}</span>
        </div>
      </div>
      <p className="py-2">{comment}</p>
      <div className="flex gap-4 pt-3">
        <LikeButton isActive={isLiked} onClick={like} count={likes} />
        <LikeButton
          isActive={isDisliked}
          onClick={dislike}
          dislike
          count={dislikes}
        />
      </div>
    </div>
  );
};

export default React.memo(Comment);
