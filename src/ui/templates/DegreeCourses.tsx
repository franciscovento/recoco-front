'use client';
import { useGetCourseByDegreeQuery } from '@/store/api/recoco/courseApi';
import React from 'react';
import CourseCard from '../molecules/CourseCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Props {
  degree_id: string;
}
const DegreeCourses = ({ degree_id }: Props) => {
  const { user } = useSelector((state: RootState) => state.ui);
  const { data } = useGetCourseByDegreeQuery(degree_id);

  return (
    <div className="grid gap-4">
      {data?.map(({ course, course_id }) => {
        return (
          <CourseCard
            key={course_id}
            canDelete={course.created_by === user?.id}
            courseId={course_id}
            courseName={course.name}
            teacherClasses={course._count.courseTeacher}
            classCode={course.course_code}
            degreeId={+degree_id}
          />
        );
      })}
    </div>
  );
};

export default DegreeCourses;
