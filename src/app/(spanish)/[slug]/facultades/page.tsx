import { getFacultiesByUniversityId } from '@/lib/services/faculty.service';
import SimpleCard from '@/ui/molecules/SimpleCard';
import React, { FC } from 'react';

interface Props {
  params: {
    slug: string;
  };
}

const Page: FC<Props> = async ({ params }) => {
  const { data } = await getFacultiesByUniversityId(params.slug);
  const faculties = data.data;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] w-full max-w-3xl mx-auto py-8 gap-4">
      {faculties.map((faculty) => (
        <SimpleCard
          key={faculty.id}
          name={faculty.name}
          detail={faculty.slug}
          href={`/${params.slug}/facultades/${faculty.id}`}
        />
      ))}
    </div>
  );
};

export default Page;
