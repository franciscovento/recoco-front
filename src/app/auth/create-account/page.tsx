import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <>
      <h1 className="text-7xl">CREATE ACCOUNT</h1>
      <Link href={'/'} className="underline text-blue-500 font-bold text-3xl">
        GO TO HOME
      </Link>
    </>
  );
};

export default Page;
