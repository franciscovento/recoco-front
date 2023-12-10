import { getDegreeById } from '@/lib/services/degree.service';
import FilterCourses from '@/ui/templates/FilterCourses';
import React from 'react';

const Page = async ({ params }: { params: { id: string } }) => {
  const { data: degreeResponse } = await getDegreeById(params.id);
  const degree = degreeResponse.data || [];
  const degree_id = +params.id;
  const faculty_id = +degree.faculty_id;

  return (
    <div className="flex flex-col sm:flex-row h-[calc(100vh-70px)] overflow-hidden">
      <div className="hidden md:flex w-[460px] max-w-full bg-[url(/images/shared/recoco-side.png)] h-screen bg-cover p-8">
        <div className="pt-40">
          <p className="text-black">Bienvenido a</p>
          <h1 className="uppercase text-2xl font-semibold text-black ">
            {degree.name}
          </h1>
          <p className="text-black uppercase">
            {degree.faculty.university.name}
          </p>
        </div>
      </div>
      <div className=" px-4 py-12  w-full overflow-y-auto">
        <FilterCourses degree_id={degree_id} faculty_id={faculty_id} />
      </div>
    </div>
  );
};

export default Page;
