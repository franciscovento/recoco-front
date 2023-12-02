import React, { ReactComponentElement } from 'react';
interface Props extends React.ComponentPropsWithoutRef<'svg'> {}
const SvgDelete = ({ ...svgProps }: Props) => {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
      className="hover:text-[#F21515] duration-300 text-app-text"
    >
      <circle cx="15.5" cy="15.5" r="15.5" fill="currentColor" />
      <path
        d="M9.16675 11.5417H21.8334M13.9167 14.7083V19.4583M17.0834 14.7083V19.4583M9.95841 11.5417L10.7501 21.0417C10.7501 21.4616 10.9169 21.8643 11.2138 22.1613C11.5108 22.4582 11.9135 22.625 12.3334 22.625H18.6667C19.0867 22.625 19.4894 22.4582 19.7863 22.1613C20.0833 21.8643 20.2501 21.4616 20.2501 21.0417L21.0417 11.5417M13.1251 11.5417V9.16667C13.1251 8.9567 13.2085 8.75534 13.357 8.60687C13.5054 8.45841 13.7068 8.375 13.9167 8.375H17.0834C17.2934 8.375 17.4947 8.45841 17.6432 8.60687C17.7917 8.75534 17.8751 8.9567 17.8751 9.16667V11.5417"
        stroke="white"
        strokeWidth="1.58333"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgDelete;
