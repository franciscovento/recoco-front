import { getDegreesByFacultyId } from '@/lib/services/degree.service';
import SimpleCard from '@/ui/molecules/SimpleCard';
import React, { FC } from 'react';

interface Props {
  params: {
    slug: string;
    faculty_id: string;
  };
}
const Page: FC<Props> = async ({ params }) => {
  const { data } = await getDegreesByFacultyId(params.faculty_id);
  const degrees = data.data;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] w-full max-w-3xl mx-auto py-8 gap-4">
      {degrees.map((degree) => (
        <SimpleCard
          key={degree.id}
          name={degree.name}
          detail={degree.slug}
          href={`/${params.slug}/carreras/${degree.id}`}
        />
      ))}
    </div>
  );
};

export default Page;
