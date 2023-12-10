'use client';
import React from 'react';
import CourseCard from '../molecules/CourseCard';
import { DegreeCourse } from '@/lib/interfaces/degree.interface';

interface Props {
  courses: DegreeCourse[];
  userId: string;
  degreeId: number;
}
const DegreeCourses = ({ courses, userId, degreeId }: Props) => {
  return (
    <div className="grid gap-4">
      {courses?.map(({ course, course_id }) => {
        return (
          <CourseCard
            key={course_id}
            canDelete={course.created_by === userId}
            courseId={course_id}
            courseName={course.name}
            teacherClasses={course._count.courseTeacher}
            classCode={course.course_code}
            degreeId={degreeId}
          />
        );
      })}
    </div>
  );
};

export default DegreeCourses;
