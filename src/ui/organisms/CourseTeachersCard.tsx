import React from 'react';
import CourseTag from '../atoms/CourseTag';
import Card from '../atoms/Card';
import TeacherClassCard from '../molecules/TeacherClassCard';

interface Props {
  courseTag: string;
  courseName: string;
  courseHours: string;
  teacherClasses: {
    teacherName: string;
    totalComments: number;
    difficulty: number;
    quality: number;
  }[];
}
export const CourseTeachersCard = ({
  courseHours,
  courseName,
  courseTag,
  teacherClasses,
}: Props) => {
  return (
    <Card className="bg-[#FBFBFC]">
      <div className="flex gap-8">
        <CourseTag tag={courseTag} />
        <div>
          <h3 className="">{courseName}</h3>
          <span className="text-xs text-app-text">
            Carga Horaria: {courseHours}
          </span>
        </div>
      </div>
      <div className="py-6 flex flex-col gap-3">
        {teacherClasses.map((teacherClass, index) => (
          <TeacherClassCard
            key={index}
            isActive={index === 0}
            teacherName={teacherClass.teacherName}
            totalComments={teacherClass.totalComments}
            difficulty={teacherClass.difficulty}
            quality={teacherClass.quality}
          />
        ))}
      </div>
    </Card>
  );
};
