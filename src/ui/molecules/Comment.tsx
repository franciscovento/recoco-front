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
import useConfirm from '@/lib/hooks/modals/useAppNotification';

interface Props {
  id: string;
  userImage: string;
  userName: string;
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
  userName,
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
  const [likeComment, statusLike] = useLikeCommentMutation();
  const [dislikeComment, statusDislike] = useDislikeCommentMutation();
  const { confirm } = useConfirm();
  const like = async () => {
    if (!isAuthenticated) {
      return failedNotification(
        'Necesitas iniciar sesión para realizar esta acción'
      );
    }
    try {
      const resp = await likeComment({
        comment_id: id,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const dislike = async () => {
    if (!isAuthenticated) {
      return failedNotification(
        'Necesitas iniciar sesión para realizar esta acción'
      );
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
    confirm({
      title: '¿Estás seguro de eliminar este comentario?',
      content: 'Si eliminas este comentario, no podrás recuperarlo.',
      onOk: async () => {
        try {
          await removeComment({
            id,
          }).unwrap();
        } catch (error) {
          failedNotification('Error al eliminar el comentario');
          console.log(error);
        }
      },
    });
  };

  const commentDate = new Date(date);

  return (
    <div className="border-t-2 border-[#E8E8EC]">
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center text-sm gap-2">
          <Image src={userImage} width={30} height={30} alt="" />
          {/* <span>{userName}</span> */}
        </div>
        <div className="text-right">
          <Rating value={commentRating} readonly />
          <span className="text-xs">{getUTCStringDate(commentDate)}</span>
        </div>
      </div>
      <p className="py-2">{comment}</p>
      <div className="flex gap-4 pt-3 items-center justify-between">
        <div className="flex gap-4">
          <LikeButton
            isActive={isLiked}
            onClick={like}
            count={likes}
            isLoading={statusLike.isLoading}
          />
          <LikeButton
            isLoading={statusDislike.isLoading}
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
