import { getUniversities } from '@/lib/services/university.service';
import SimpleCard from '@/ui/molecules/SimpleCard';
import React, { FC } from 'react';
import { appRoutes } from '../../../../../routes';
import { getFacultiesByUniversityId } from '@/lib/services/faculty.service';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const { data } = await getUniversities();
  const universities = data.data;
  return universities.map((uni) => ({
    slug: uni.slug,
  }));
}

const Page: FC<Props> = async ({ params }) => {
  const { data } = await getFacultiesByUniversityId(params.slug);
  const faculties = data.data;
  return (
    <div className="w-full max-w-3xl mx-auto p-8 gap-4">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] w-full max-w-3xl mx-auto py-8 gap-4">
        {faculties.map((faculty) => (
          <SimpleCard
            key={faculty.id}
            name={faculty.name}
            detail={faculty.slug}
            href={appRoutes.facultades.detail(params.slug, faculty.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
