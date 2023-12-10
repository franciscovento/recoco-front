import clsx from 'clsx';
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
      className={clsx(
        'text-xs  min-w-[70px] max-w-full text-center p-1 rounded-2xl duration-300 ',
        {
          'text-app-primary border-app-primary border': isActive,
          'text-app-text border-app-border border-2': !isActive,
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default ChipButton;
