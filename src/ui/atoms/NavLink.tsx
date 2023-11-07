'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
const NavLink = () => {
  const pathname = usePathname();
  console.log(pathname);
  return <div>NavLink</div>;
};

export default NavLink;
