'use client';
import React from 'react';
import CourseTag from '../atoms/CourseTag';
import Card from '../atoms/Card';
import TeacherClassCard from '../molecules/TeacherClassCard';
import { useGetTeacherClassByCourseQuery } from '@/store/api/recoco/teacherClassApi';
import TeacherClassSkeleton from '../atoms/skeletons/TeacherClassSkeleton';

interface Props {
  courseId: number;
  courseTag: string;
  courseName: string;
  courseCode: string;
}
export const CourseTeachersCard = ({
  courseId,
  courseCode,
  courseName,
  courseTag,
}: Props) => {
  const { data: teacherClassResponse, isLoading } =
    useGetTeacherClassByCourseQuery(courseId);
  const teacherClass = teacherClassResponse?.data;

  return (
    <Card className="bg-[#FBFBFC]">
      <div className="flex gap-8">
        <CourseTag tag={courseTag} />
        <div>
          <h3 className="capitalize">{courseName}</h3>
          <span className="text-xs text-app-text">
            Código de materia: {courseCode}
          </span>
        </div>
      </div>
      <div className="py-6 flex flex-col gap-3">
        {teacherClass?.length === 0 && (
          <div className="text-sm text-app-text">
            No hay profesores agregados a este curso, sé el primero en agregar
            uno...
          </div>
        )}
        {!isLoading ? (
          teacherClass?.map((teacherClass, index) => (
            <TeacherClassCard
              key={teacherClass.teacher_id}
              isActive={index === 0}
              teacherName={teacherClass.teacher.name}
              teacherLastName={teacherClass.teacher.last_name}
              totalComments={teacherClass._count.comments}
              score={teacherClass?.quality}
              teacherClassName={teacherClass.teacher_class_name}
              courseId={teacherClass.course_id}
              teacherId={teacherClass.teacher_id}
              createdBy={teacherClass.created_by}
            />
          ))
        ) : (
          <TeacherClassSkeleton />
        )}
      </div>
    </Card>
  );
};
