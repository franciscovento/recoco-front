import { Difficulty } from '@/lib/interfaces/difficulty.enmu';
import clsx from 'clsx';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'animate.css';
import ResourcesCard from '../organisms/ResourcesCard';
import { useParams } from 'next/navigation';
interface Props {
  className?: string;
  teacherName: string;
  teacherLastName: string;
  difficulty: number;
  courseName: string;
}
const CommentsTitle = ({
  className,
  courseName,
  teacherName,
  difficulty,
  teacherLastName,
}: Props) => {
  const params = useParams();
  // "Facil", "Medio", "Dificil", "Infumable"
  const difficultyTag =
    difficulty < 2
      ? Difficulty.EASY
      : difficulty < 3
      ? Difficulty.MEDIUM
      : difficulty < 4
      ? Difficulty.HARD
      : Difficulty.HEAVY;

  const appSwal = withReactContent(Swal);

  const handleShowResources = () => {
    appSwal.fire({
      position: 'center-right',
      html: (
        <ResourcesCard
          teacher_id={+params.teacher_id as number}
          course_id={+params.course_id as number}
        />
      ),
      grow: 'column',
      showClass: {
        popup: `
        animate__animated
        animate__fadeInRight
        animate__faster
      `,
      },
      hideClass: {
        popup: `
        animate__animated
        animate__fadeOutRight
        animate__faster
      `,
      },

      width: 350,
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  return (
    <div
      className={`bg-app-background p-6 rounded-xl flex flex-col gap-4 ${className}`}
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-2xl font-semibold capitalize">
          {teacherName} {teacherLastName}
        </h3>
        <button
          onClick={handleShowResources}
          className="flex items-center gap-1 text-app-secondary text-xs  min-w-[70px] max-w-full text-center py-1 px-4 rounded-2xl border w-fit border-app-secondary hover:bg-app-secondary hover:text-white transition-all duration-300"
        >
          Ver recursos útiles{' '}
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-app-text">
          Dificultad de la materia:{' '}
        </span>
        <div
          className={clsx(
            'text-xs  min-w-[70px] max-w-full text-center p-1 rounded-2xl border w-fit',
            {
              'bg-app-primary text-white': difficultyTag == Difficulty.EASY,
              'bg-app-secondary text-white': difficultyTag == Difficulty.MEDIUM,
              'bg-orange-300 text-white': difficultyTag == Difficulty.HARD,
              'bg-red-300 text-white': difficultyTag == Difficulty.HEAVY,
            }
          )}
        >
          {difficulty > 0 ? difficultyTag : 'Sin calificar'}
        </div>
      </div>
    </div>
  );
};

export default CommentsTitle;
