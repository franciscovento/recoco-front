import { useGetDegreeByIdQuery } from '@/store/api/recoco/degreeApi';
import FilterCourses from '@/ui/templates/FilterCourses';
import React from 'react';
import Chatbot from '@/ui/templates/Chatbot';
import Header from '@/ui/organisms/Header';
import { appRoutes } from '../../../../../../../../routes';
import { getUniversities } from '@/lib/services/university.service';
import { getFacultiesByUniversityId } from '@/lib/services/faculty.service';
import {
  getDegreeById,
  getDegreesByFacultyId,
} from '@/lib/services/degree.service';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { data } = await getUniversities();
  const universities = data.data;

  const params: { faculty_id: string; degree_id: string; slug: string }[] = [];

  for (const university of universities) {
    const faculties = await getFacultiesByUniversityId(university.slug);
    for (const faculty of faculties.data.data) {
      const degrees = await getDegreesByFacultyId(faculty.id);
      for (const degree of degrees.data.data) {
        params.push({
          faculty_id: faculty.id.toString(),
          degree_id: degree.id.toString(),
          slug: university.slug,
        });
      }
    }
  }

  return params;
}

const Page = async ({
  params,
}: {
  params: { faculty_id: string; degree_id: string; slug: string };
}) => {
  const { data: degreeResponse } = await getDegreeById(params.degree_id);
  if (!degreeResponse?.data) {
    notFound();
  }

  const degree = degreeResponse?.data;
  const degree_id = +params.degree_id;
  const faculty_id = degree ? +degree?.faculty_id : 0;

  return (
    <>
      <Header
        headerHref={appRoutes.facultades.detail(params.slug, faculty_id)}
        headerName={degree?.faculty.name || ''}
      />
      <div className="flex flex-col sm:flex-row h-[calc(100vh-70px)] overflow-hidden">
        <div className="hidden md:flex w-[460px] max-w-full bg-[url(/images/shared/recoco-side.png)] h-screen bg-cover p-8">
          <div className="pt-40">
            <p className="text-black">Bienvenido a</p>
            <h1 className="uppercase text-2xl font-semibold text-black ">
              {degree?.name}
            </h1>
            <p className="text-black uppercase">
              {degree?.faculty.university.name}
            </p>
          </div>
        </div>
        <div className=" px-4 py-12  w-full overflow-y-auto">
          <FilterCourses degree_id={degree_id} faculty_id={faculty_id} />
        </div>
        <Chatbot facultyId={faculty_id} />
      </div>
    </>
  );
};

export default Page;
