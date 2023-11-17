'use client';
import React from 'react';
import Rating from './Rating';
interface Props {
  className?: string;
  ranking: number;
  totalComments: number;
}

const CourseTeacherRanking = ({ ranking, className, totalComments }: Props) => {
  return (
    <div
      className={`p-6 rounded-xl border border-[#E8E8EC] flex items-center gap-[22px] max-w-full ${className}`}
    >
      <span className="block text-app-primary text-[45px] font-bold">
        {ranking}
      </span>
      <div className="flex flex-col gap-1">
        <div>
          <Rating value={ranking} readonly />
        </div>

        <span className="text-xs text-black font-medium">
          {totalComments} calificaciones
        </span>
      </div>
    </div>
  );
};

export default CourseTeacherRanking;
