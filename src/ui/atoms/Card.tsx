import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}
const Card = ({ children, className }: Props) => {
  return (
    <div className={`rounded-[20px] shadow-app-card p-6 w-full  ${className}`}>
      {children}
    </div>
  );
};

export default Card;
