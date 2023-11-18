import React from 'react';

interface Props extends React.ComponentPropsWithRef<'button'> {
  variant?: 'outline' | 'solid';
  color?: 'primary';
}
const Button = ({
  className,
  children,
  variant = 'solid',
  color = 'primary',
  ...buttonProps
}: Props) => {
  const styles = {
    primary: {
      outline: 'border-app-primary border',
      solid: 'bg-app-primary hover:bg-app-primary-accent',
    },
  };
  return (
    <button
      className={`rounded-3xl p-2 text-xs duration-300 disabled:bg-gray-300 disabled:text-black ${styles[color][variant]} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
