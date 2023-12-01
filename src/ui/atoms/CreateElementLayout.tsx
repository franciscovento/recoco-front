import React from 'react';
import SvgRecocoBlink from './svg/branding/SvgRecocoBlink';
import Card from './Card';

interface Props {
  children: React.ReactNode;
  title: string;
  cancelText?: string;
  confirmText?: string;
}
const CreateElementLayout = ({ title, children }: Props) => {
  return (
    <Card className="bg-white relative">
      <SvgRecocoBlink className="absolute -top-10 right-1/2 translate-x-1/2" />
      <h3 className="font-semibold text-xl py-6">{title}</h3>
      {children}
    </Card>
  );
};

export default CreateElementLayout;
