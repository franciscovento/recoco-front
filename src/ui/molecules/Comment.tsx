import Image from 'next/image';
import React from 'react';
import Rating from './Rating';
import LikeButton from '../atoms/LikeButton';

interface Props {
  userImage: string;
  commentRating: number;
  date: string;
  comment: string;
  likes: number;
  dislikes: number;
}
const Comment = ({
  comment,
  commentRating,
  date,
  dislikes,
  likes,
  userImage,
}: Props) => {
  return (
    <div className="border-t-2 border-[#E8E8EC]">
      <div className="flex items-center justify-between pt-4">
        <Image src={userImage} width={30} height={30} alt="" />
        <div className="text-right">
          <Rating value={commentRating} readonly />
          <span className="text-xs">{date}</span>
        </div>
      </div>
      <p className="py-2">{comment}</p>
      <div className="flex gap-4 pt-3">
        <LikeButton count={likes} />
        <LikeButton dislike count={dislikes} />
      </div>
    </div>
  );
};

export default Comment;
