import Rating from '@/ui/molecules/Rating';
import React from 'react';

const TeacherHeaderSkeleton = () => {
  return (
    <div className="flex justify-between gap-4 flex-wrap">
      <div className={`bg-app-background p-6 rounded-xl flex-1 animate-pulse`}>
        <div className="flex items-center gap-4 pb-1">
          <div className="flex gap-2">
            <span className="h-6 inline-block font-semibold capitalize w-40 bg-gray-200 rounded-lg"></span>
            <span className="h-6 inline-block font-semibold capitalize w-20 bg-gray-200 rounded-lg"></span>
          </div>
        </div>
        <span className="w-20 h-3 pt-2 block bg-gray-200"></span>
      </div>
      <div
        className={`p-6 rounded-xl border border-[#E8E8EC] flex items-center gap-[22px] max-w-full animate-pulse`}
      >
        <span className="block text-gray-300 text-[45px] font-bold">{'-'}</span>
        <div className="flex flex-col gap-1">
          <div>
            <Rating value={5} readonly fillColor="#E8E8EC" />
          </div>

          <span className="text-xs text-gray-300 font-medium">
            - calificaciones
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeacherHeaderSkeleton;
