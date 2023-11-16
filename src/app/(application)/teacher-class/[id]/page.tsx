import Card from '@/ui/atoms/Card';
import { CourseTeachersCard } from '@/ui/organisms/CourseTeachersCard';
import React from 'react';
import teacherClassesMock from '../../../../../public/data/teacher-class-mock.json';
import CreateTeacherClassCard from '@/ui/molecules/CreateTeacherClassCard';
import CommentsTitle from '@/ui/molecules/CommentsTitle';
import CourseTeacherRanking from '@/ui/molecules/CourseTeacherRanking';
const page = () => {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen gap-8">
      <div className="w-full lg:w-[430px] flex flex-col gap-8">
        <CourseTeachersCard
          courseHours="45"
          courseTag="EC"
          courseName="Administración General"
          teacherClasses={teacherClassesMock}
        />
        <CreateTeacherClassCard />
      </div>
      <div className="flex-1">
        <Card className="bg-white h-full">
          <div className="flex justify-between gap-4 flex-wrap">
            <CommentsTitle className="flex-1" />
            <CourseTeacherRanking />
          </div>
        </Card>
      </div>
    </main>
  );
};

export default page;
