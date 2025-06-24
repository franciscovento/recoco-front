import { Difficulty } from '@/lib/interfaces/difficulty.enmu';
import clsx from 'clsx';
import React from 'react';
import { useParams } from 'next/navigation';
import { ResourceDrawer } from '../organisms/drawers/ResourceDrawer';

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

  return (
    <div
      className={`bg-app-background p-6 rounded-xl flex flex-col gap-4 ${className}`}
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-2xl font-semibold capitalize">
          {teacherName} {teacherLastName}
        </h3>
        <ResourceDrawer
          buttonProps={{
            size: 'small',
            variant: 'outlined',
            color: 'primary',
          }}
          teacher_id={+params.teacher_id as number}
          course_id={+params.course_id as number}
        >
          Ver recursos útiles
        </ResourceDrawer>
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
