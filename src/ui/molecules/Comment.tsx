'use client';
import Image from 'next/image';
import React from 'react';
import Rating from './Rating';
import LikeButton from '../atoms/LikeButton';
import { getUTCStringDate } from '@/lib/helpers/formatDate.helper';
import {
  useDeleteCommentMutation,
  useDislikeCommentMutation,
  useLikeCommentMutation,
} from '@/store/api/recoco/commentApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { failedNotification } from '@/lib/services/notification.service';
import SvgDelete from '../atoms/svg/SvgDelete';
import { confirmModal } from '@/lib/services/modal.service';

interface Props {
  id: string;
  userImage: string;
  commentRating: number;
  date: string;
  comment: string;
  likes: number;
  dislikes: number;
  created_by: string;
  isLiked?: boolean;
  isDisliked?: boolean;
}
const Comment = ({
  id,
  comment,
  commentRating,
  date,
  dislikes,
  likes,
  created_by,
  userImage,
  isLiked = false,
  isDisliked = false,
}: Props) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.ui);
  const [removeComment] = useDeleteCommentMutation();
  const [likeComment] = useLikeCommentMutation();
  const [dislikeComment] = useDislikeCommentMutation();

  const like = async () => {
    if (!isAuthenticated) {
      return failedNotification('Necesitas iniciar sesión');
    }
    try {
      const resp = await likeComment({
        comment_id: id,
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
        comment_id: id,
      }).unwrap();
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async () => {
    const confirm = await confirmModal(
      '¿Estás seguro de eliminar este comentario?'
    );
    if (confirm) {
      try {
        await removeComment({
          id,
        }).unwrap();
      } catch (error) {
        failedNotification('Error al eliminar el comentario');
        console.log(error);
      }
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
      <div className="flex gap-4 pt-3 items-center justify-between">
        <div className="flex gap-4">
          <LikeButton isActive={isLiked} onClick={like} count={likes} />
          <LikeButton
            isActive={isDisliked}
            onClick={dislike}
            dislike
            count={dislikes}
          />
        </div>
        {created_by === user?.id && (
          <button className="cursor-pointer" onClick={deleteComment}>
            <SvgDelete />
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(Comment);
