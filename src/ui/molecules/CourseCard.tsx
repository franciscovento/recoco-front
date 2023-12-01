import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';

interface Props {
  isActive?: boolean;
  courseName: string;
  totalComments: number;
  teacherClasses: number;
  classCode: string;
}

const CourseCard = ({
  isActive = false,
  teacherClasses,
  courseName,
  totalComments,
  classCode,
}: Props) => {
  return (
    <div
      className={clsx(
        'p-4 border shadow-app-teacher-class rounded-xl flex items-center gap-4 cursor-pointer duration-300 hover:border-app-primary hover:border-[1.5px] bg-white',
        {
          'border-app-primary border-[1.5px]': isActive === true,
        }
      )}
    >
      <div className=" bg-app-primary rounded-lg w-[50px] h-[50px] text-white flex items-center justify-center text-xl font-bold">
        {classCode}
      </div>
      <div>
        <div className="flex items-center gap-4 pb-2">
          <h3 className="text-app-primary-dark">{courseName}</h3>
          <span className="block w-2 h-2 bg-app-text rounded-full"></span>
          <span className="text-xs text-app-text">
            {teacherClasses} Cátedras
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Image src={'/svg/comments.svg'} width={63} height={23} alt="" />
          <span className="text-xs text-app-text">
            {totalComments} comentarios
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
