import React from 'react';

interface Props extends React.ComponentPropsWithRef<'button'> {
  isActive?: boolean;
  children: React.ReactNode;
}
const ChipButton = ({
  children,
  className,
  isActive,
  ...buttonProps
}: Props) => {
  return (
    <button
      {...buttonProps}
      className={`text-xs  min-w-[70px] max-w-full text-center p-1 rounded-2xl duration-300 hover:text-app-primary hover:border-app-primary ${
        isActive
          ? 'text-app-primary border-app-primary border'
          : 'text-app-text border-app-border border-2'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default ChipButton;
