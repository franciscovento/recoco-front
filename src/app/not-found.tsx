import SvgRecocoAsk from '@/ui/atoms/svg/branding/SvgRecocoAsk';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="w-screen h-screen flex flex-1 flex-col gap-4 p-8 justify-center items-center bg-app-primary-dark">
      <div className="text-white text-6xl">404</div>
      <h1 className="text-3xl text-white text-center">
        Parece que esta página no existe o se ha movido
      </h1>
      <SvgRecocoAsk />
      <Link
        className="text-xl  text-white flex items-center gap-1 hover:text-white "
        href={'/'}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path
            d="M19 12H5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;
