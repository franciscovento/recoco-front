import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const TeacherClassSkeleton = () => {
  const teacherClasses = [1, 2, 3];
  return teacherClasses.map((_, index) => (
    <div
      key={index}
      className={clsx(
        'animate-pulse p-4 border shadow-app-teacher-class rounded-xl flex  items-center gap-4 cursor-pointer duration-300 hover:border-gray-300 hover:border-[1.5px]'
      )}
    >
      <div className="w-[5px] h-[50px] bg-gray-300 rounded-3xl"></div>
      <div>
        <div className="flex flex-wrap items-center gap-4 pb-2">
          <h3 className="bg-gray-300 w-32 h-4"></h3>
          <span className="block w-2 h-2 bg-app-text rounded-full"></span>
          <span className="bg-gray-300 w-20 h-3"></span>
        </div>
        <div className="flex items-center flex-wrap gap-3">
          <Image
            className="grayscale"
            src={'/svg/comments.svg'}
            width={63}
            height={23}
            alt=""
          />
          <span className="bg-slate-300 w-20 h-3"></span>
        </div>
      </div>
    </div>
  ));
};

export default TeacherClassSkeleton;
