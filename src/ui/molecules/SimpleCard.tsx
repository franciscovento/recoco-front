import { formatText } from '@/lib/helpers/formatText';
import { University } from '@/lib/interfaces/university.interface';
import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
  href: string;
  name: string;
  detail: string;
}
const SimpleCard: FC<Props> = async ({ detail, href, name }) => {
  return (
    <Link href={href} className="border border-app-primary-accent rounded-3xl ">
      <div className="group duration-300 cursor-pointer bg-white rounded-3xl p-4 flex flex-col gap-2">
        <h3 className="duration-300 text-center text-app-title group-hover:text-app-primary text-xl font-bold">
          {formatText(name)}
        </h3>
      </div>
    </Link>
  );
};

export default SimpleCard;
