import React from 'react';

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <>
      {/* <header>HEADER</header> */}
      <main>{children}</main>
      {/* <footer>FOOTER</footer> */}
    </>
  );
};

export default Layout;
