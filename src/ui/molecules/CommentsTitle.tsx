import { Difficulty } from '@/lib/interfaces/difficulty.enmu';
import clsx from 'clsx';
import React from 'react';

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
    <div className={`bg-app-background p-6 rounded-xl ${className}`}>
      <div className="flex items-center gap-4 pb-1">
        <h3 className="text-2xl font-semibold capitalize">
          {teacherName} {teacherLastName}
        </h3>
        <span className="block w-2 h-2 bg-app-text rounded-full"></span>
        <span
          className={clsx(
            'text-xs  min-w-[70px] max-w-full text-center p-1 rounded-2xl border',
            {
              'bg-app-primary text-white': difficultyTag == Difficulty.EASY,
              'bg-app-secondary text-white': difficultyTag == Difficulty.MEDIUM,
              'bg-orange-300 text-white': difficultyTag == Difficulty.HARD,
              'bg-red-300 text-white': difficultyTag == Difficulty.HEAVY,
            }
          )}
        >
          {difficulty > 0 ? difficultyTag : 'Sin calificar'}
        </span>
      </div>
      <span className="text-sm text-app-text">Cátedra de {courseName}</span>
    </div>
  );
};

export default CommentsTitle;
