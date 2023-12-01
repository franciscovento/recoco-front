import React from 'react';

interface Props extends React.ComponentPropsWithRef<'button'> {
  variant?: 'outline' | 'solid';
  color?: 'primary';
  size?: 'sm' | 'md' | 'lg';
}
const Button = ({
  className,
  children,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  ...buttonProps
}: Props) => {
  const styles = {
    primary: {
      outline: 'border-app-primary border',
      solid: 'bg-app-primary hover:bg-app-primary-accent',
    },
    size: {
      sm: 'w-[80px] text-xs',
      md: 'w-[114px] text-sm',
      lg: 'w-[120px] text-base',
    },
  };
  return (
    <button
      className={`rounded-3xl p-2 text-xs duration-300 disabled:bg-gray-300 disabled:text-black ${styles.size[size]} ${styles[color][variant]} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
