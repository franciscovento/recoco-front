import Card from '@/ui/atoms/Card';
import CreateComment from '@/ui/organisms/CreateComment';
import React from 'react';
import Comments from '@/ui/templates/Comments';
import TeacherClassHeader from '@/ui/templates/TeacherClassHeader';

interface Props {
  params: { course_id: string; teacher_id: string; slug: string };
}
const Page = async ({ params }: Props) => {
  return (
    <Card className="bg-white h-full">
      <TeacherClassHeader
        course_id={+params.course_id}
        teacher_id={+params.teacher_id}
      />
      <div className="pt-12">
        <CreateComment
          course_id={+params.course_id}
          teacher_id={+params.teacher_id}
        />
      </div>
      <div className="py-8">
        <Comments
          teacher_id={+params.teacher_id}
          course_id={+params.course_id}
        />
      </div>
    </Card>
  );
};

export default Page;