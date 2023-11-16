import React from 'react';

interface Props {
  className?: string;
}
const CommentsTitle = ({ className }: Props) => {
  return (
    <div className={`bg-app-background p-6 rounded-xl ${className}`}>
      <div className="flex items-center gap-4 pb-1">
        <h3 className="text-2xl font-semibold">Michialla Alexandra</h3>
        <span className="block w-2 h-2 bg-app-text rounded-full"></span>
        <span className="text-xs text-app-primary w-[111px] max-w-full border border-app-primary text-center p-1 rounded-2xl">
          Dificultad fácil
        </span>
      </div>
      <span className="text-sm text-app-text">
        Cátedra de Administración General
      </span>
    </div>
  );
};

export default CommentsTitle;
