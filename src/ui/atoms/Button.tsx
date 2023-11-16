import React from 'react';

interface Props extends React.ComponentPropsWithRef<'button'> {}
const Button = ({ className, children, ...buttonProps }: Props) => {
  return (
    <button
      className={`bg-app-primary rounded-3xl p-2 text-xs hover:bg-app-primary-accent duration-300 ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
