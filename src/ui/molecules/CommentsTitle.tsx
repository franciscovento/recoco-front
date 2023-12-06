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
    difficulty == 1
      ? 'Fácil'
      : difficulty == 2
      ? 'Medio'
      : difficulty == 3
      ? 'Difícil'
      : 'Infumable';
  return (
    <div className={`bg-app-background p-6 rounded-xl ${className}`}>
      <div className="flex items-center gap-4 pb-1">
        <h3 className="text-2xl font-semibold capitalize">
          {teacherName} {teacherLastName}
        </h3>
        <span className="block w-2 h-2 bg-app-text rounded-full"></span>
        <span className="text-xs text-app-primary min-w-[70px] max-w-full border border-app-primary text-center p-1 rounded-2xl">
          {difficulty > 0 ? difficultyTag : 'Sin calificar'}
        </span>
      </div>
      <span className="text-sm text-app-text">Cátedra de {courseName}</span>
    </div>
  );
};

export default CommentsTitle;
