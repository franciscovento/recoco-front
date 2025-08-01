'use client';
import React, { useEffect } from 'react';
import SvgRecocoThinking from '../atoms/svg/branding/SvgRecocoThinking';
import DegreeCourses from './DegreeCourses';
import CreateCourse from '../organisms/forms/CreateCourse';

import { useGetCourseByDegreeQuery } from '@/store/api/recoco/courseApi';
import { DegreeCourse } from '@/lib/interfaces/degree.interface';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { removeAccents } from '@/lib/helpers/removeAccents';
import { orderCoursesByName } from '@/lib/helpers/orderCoursesByName';
import CoursesSkeleton from '../atoms/skeletons/CoursesSkeleton';
import Search from 'antd/es/input/Search';

interface Props {
  degree_id: number;
  faculty_id: number;
}
const FilterCourses = ({ degree_id, faculty_id }: Props) => {
  const [search, setSearch] = React.useState('');
  const user = useSelector((state: RootState) => state.ui.user);
  const { data: coursesByDegreeResponse, isLoading } =
    useGetCourseByDegreeQuery(degree_id);

  const filteredCourses = coursesByDegreeResponse?.data?.filter(
    (degreeCourse) =>
      removeAccents(degreeCourse.course.name)
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col gap-4 items-center max-w-[900px] mx-auto">
      <SvgRecocoThinking />
      <h2 className="text-xl font-medium">Hola, ¿qué materia buscas?</h2>
      <Search
        value={search}
        allowClear
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Escribe el nombre de la materia"
        className="w-full"
        size="middle"
      />
      <div className="w-full py-8">
        {!isLoading ? (
          <DegreeCourses
            degreeId={degree_id}
            courses={orderCoursesByName(filteredCourses || [])}
            facultyId={faculty_id}
            userId={user?.id || ''}
          />
        ) : (
          <CoursesSkeleton />
        )}
      </div>

      <CreateCourse degreeId={degree_id} facultyId={faculty_id} />
    </div>
  );
};

export default FilterCourses;
