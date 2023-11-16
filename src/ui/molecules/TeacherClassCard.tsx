import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';

interface Props {
  isActive?: boolean;
}

const TeacherClassCard = ({ isActive = false }: Props) => {
  return (
    <div
      className={clsx(
        'p-4 border shadow-app-teacher-class rounded-xl flex items-center gap-4 cursor-pointer duration-300 hover:border-app-primary hover:border-[1.5px]',
        {
          'border-app-primary border-[1.5px]': isActive === true,
        }
      )}
    >
      <div className="w-[5px] h-[50px] bg-app-primary rounded-3xl"></div>
      <div>
        <div className="flex items-center gap-4 pb-2">
          <h3 className="text-app-primary-dark">Elton Tito</h3>
          <span className="block w-2 h-2 bg-app-text rounded-full"></span>
          <span className="text-xs text-app-text">Promocionable</span>
        </div>
        <div className="flex items-center gap-3">
          <Image src={'/svg/comments.svg'} width={63} height={23} alt="" />
          <span className="text-xs text-app-text">45 comentarios</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassCard;
