import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const CoursesSkeleton = () => {
  const courses = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="grid gap-4 animate-pulse">
      {courses.map((_, index) => (
        <div
          key={index}
          className={clsx(
            'p-4 border shadow-app-teacher-class rounded-xl flex  items-center gap-4 duration-300 hover:border-gray-300 hover:border-[1.5px] bg-white'
          )}
        >
          <div className=" bg-gray-300 rounded-lg w-[50px] h-[50px] text-white flex items-center justify-center text-xl font-bold">
            |||
          </div>
          <div>
            <div className="flex items-center flex-wrap gap-4 pb-2">
              <h3 className="bg-gray-300 w-36 h-4"></h3>
              <span className="block w-2 h-2 bg-app-text rounded-full"></span>
              <span className="h-3 w-12 bg-gray-300"></span>
            </div>
            <div className="flex items-center gap-3">
              <Image
                className="grayscale"
                src={'/svg/comments.svg'}
                width={63}
                height={23}
                alt=""
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesSkeleton;
