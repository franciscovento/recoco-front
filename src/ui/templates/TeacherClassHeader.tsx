'use client';
import React, { useEffect } from 'react';
import CommentsTitle from '../molecules/CommentsTitle';
import CourseTeacherRanking from '../molecules/CourseTeacherRanking';
import { useGetTeacherClassQuery } from '@/store/api/recoco/teacherClassApi';
import { useDispatch } from 'react-redux';
import { teacherClassActions } from '@/store/slices/teacher-class';

interface Props {
  teacher_id: number;
  course_id: number;
}
const TeacherClassHeader = ({ course_id, teacher_id }: Props) => {
  const {
    data: teacherClassResponse,
    isLoading,
    isError,
  } = useGetTeacherClassQuery({ teacher_id, course_id });
  const dispatch = useDispatch();
  const teacherClass = teacherClassResponse?.data;

  useEffect(() => {
    if (teacherClassResponse?.data) {
      dispatch(teacherClassActions.setTeacherClass(teacherClassResponse?.data));
    }
  }, [teacherClassResponse?.data]);

  if (isLoading) return <div>Cargando contenido...</div>;
  if (isError) return <div>Ocurrió un error</div>;

  return (
    <div className="flex justify-between gap-4 flex-wrap">
      <CommentsTitle
        courseName={teacherClass?.course.name || ''}
        teacherName={teacherClass?.teacher.name || ''}
        teacherLastName={teacherClass?.teacher.last_name || ''}
        difficulty={teacherClass?.difficulty || 0}
        className="flex-1"
      />
      <CourseTeacherRanking
        ranking={teacherClass?.quality || 0}
        totalComments={teacherClass?._count.comments || 0}
      />
    </div>
  );
};

export default TeacherClassHeader;
