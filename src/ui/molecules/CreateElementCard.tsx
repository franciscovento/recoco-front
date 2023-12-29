'use client';
import React from 'react';
import Card from '../atoms/Card';
import SvgRecocoAsk from '../atoms/svg/branding/SvgRecocoAsk';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import useLoginModal from '@/lib/hooks/useLoginModal';

interface Props {
  question: string;
  description: string;
  buttonText: string;
  onCreateElement: (_isAnonyms?: boolean) => void;
}

const CreateElement = ({
  question,
  description,
  buttonText,
  onCreateElement,
}: Props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.ui);
  const { loginRegisterModal } = useLoginModal();

  const handleCreateElement = async () => {
    try {
      if (!isAuthenticated) {
        const resp = await loginRegisterModal('register');
        if (resp === 'anonyms') {
          return onCreateElement(true);
        }
        if (resp === 'login') {
          return onCreateElement();
        }
        return null;
      }
      return onCreateElement();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="@container bg-[#FBFBFC] relative min-h-[220px] flex items-center @md:items-start @md:flex-col  justify-center gap-12">
      <SvgRecocoAsk
        width={172}
        height={208}
        className="hidden @xs:block absolute @md:-left-8 bottom-5 right-5 @md:right-auto"
      />

      <div className="relative @xs:pr-[140px] @md:pl-[140px] @md:pr-0 ">
        <h3 className="text-sm font-medium text-black pb-2">{question}</h3>
        <p className="text-sm text-app-text font-light pb-4">{description}</p>
        <button
          onClick={handleCreateElement}
          className="w-[177px] relative p-2 rounded-3xl border border-app-primary text-xs duration-300 hover:bg-app-primary-accent"
        >
          {buttonText}
        </button>
      </div>
    </Card>
  );
};

export default CreateElement;
