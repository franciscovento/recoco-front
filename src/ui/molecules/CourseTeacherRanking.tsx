'use client';
import React from 'react';
import { Rating } from 'react-simple-star-rating';
interface Props {
  className?: string;
}

const CourseTeacherRanking = ({ className }: Props) => {
  return (
    <div
      className={`p-6 rounded-xl border border-[#E8E8EC] flex items-center gap-[22px] max-w-full ${className}`}
    >
      <span className="block text-app-primary text-[45px] font-bold">4.5</span>
      <div className="flex flex-col">
        <Rating
          initialValue={4.5}
          allowFraction
          readonly
          size={20}
          fillColor="#00DC8C"
          emptyStyle={{ display: 'flex' }}
          /* Available Props */
        />

        <span className="text-xs text-black font-medium">
          20 calificaciones
        </span>
      </div>
    </div>
  );
};

export default CourseTeacherRanking;
