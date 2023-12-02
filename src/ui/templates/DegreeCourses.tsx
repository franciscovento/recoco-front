'use client';
import { useGetCourseByDegreeQuery } from '@/store/api/recoco/courseApi';
import React from 'react';
import CourseCard from '../molecules/CourseCard';

interface Props {
  degree_id: string;
}
const DegreeCourses = ({ degree_id }: Props) => {
  const { data } = useGetCourseByDegreeQuery(degree_id);

  return (
    <div className="grid gap-4">
      {data?.map(({ course, course_id }) => {
        return (
          <CourseCard
            key={course_id}
            hasTeachers={course.courseTeacher.length > 0}
            courseId={course_id}
            courseName={course.name}
            teacherClasses={course._count.courseTeacher}
            classCode={course.course_code}
          />
        );
      })}
    </div>
  );
};

export default DegreeCourses;
