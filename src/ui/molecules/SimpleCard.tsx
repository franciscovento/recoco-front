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
    <Link href={href}>
      <div className="group duration-300 hover:rotate-2 cursor-pointer bg-white rounded-3xl p-4  h-48 flex flex-col gap-2">
        <h3 className="duration-300 group-hover:text-app-primary text-2xl font-bold">
          {formatText(name)}
        </h3>
        <p className="text-black">{detail}</p>
      </div>
    </Link>
  );
};

export default SimpleCard;
