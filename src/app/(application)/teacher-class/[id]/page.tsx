'use client';
import Card from '@/ui/atoms/Card';
import { CourseTeachersCard } from '@/ui/organisms/CourseTeachersCard';
import React from 'react';
import teacherClassesMock from '../../../../../public/data/teacher-class-mock.json';
import CommentsTitle from '@/ui/molecules/CommentsTitle';
import CourseTeacherRanking from '@/ui/molecules/CourseTeacherRanking';
import Comment from '@/ui/molecules/Comment';
import comments from '../../../../../public/data/comments-mock.json';
import CreateComment from '@/ui/organisms/CreateComment';
import { getCourseById } from '@/lib/services/course.service';
import CreateTeacherClass from '@/ui/organisms/forms/CreateTeacherClass';

const page = async ({ params }: { params: { id: string } }) => {
  const { data: course } = await getCourseById(params.id);
  const courseId = +params.id;
  const facultyId = +course.faculty_id;
  return (
    <main className="flex flex-col lg:flex-row min-h-screen gap-8 p-4 sm:p-6">
      <div className="w-full lg:w-[430px] flex flex-col gap-8">
        <CourseTeachersCard
          courseId={+params.id}
          courseCode={course.course_code}
          courseTag={course.short_name}
          courseName={course.name}
          teacherClasses={teacherClassesMock}
        />

        <CreateTeacherClass courseId={courseId} facultyId={facultyId} />
      </div>
      <div className="flex-1">
        <Card className="bg-white h-full">
          <div className="flex justify-between gap-4 flex-wrap">
            <CommentsTitle
              courseName="Administración General"
              teacherName="Michialla Alexander"
              difficulty={'Difícil'}
              className="flex-1"
            />
            <CourseTeacherRanking ranking={4.5} totalComments={20} />
          </div>
          <div className="pt-12">
            <CreateComment />
          </div>
          <div className="flex flex-col gap-7 py-8">
            {comments.map((comment, index) => (
              <Comment
                key={index}
                userImage={comment.userImage}
                comment={comment.comment}
                commentRating={comment.commentRating}
                date={comment.date}
                dislikes={comment.dislikes}
                likes={comment.likes}
              />
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
};

export default page;
