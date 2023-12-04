import Card from '@/ui/atoms/Card';
import CourseTeacherRanking from '@/ui/molecules/CourseTeacherRanking';
import CreateComment from '@/ui/organisms/CreateComment';
import React from 'react';
import comments from '../../../../../../../public/data/comments-mock.json';
import Comment from '@/ui/molecules/Comment';
import CommentsTitle from '@/ui/molecules/CommentsTitle';
import { getTeacherClassById } from '@/lib/services/teacher-class.service';

interface Props {
  params: { id: string; teacher_id: string };
}
const page = async ({ params }: Props) => {
  const { data: teacherClass } = await getTeacherClassById(
    +params.teacher_id,
    +params.id
  );

  return (
    <Card className="bg-white h-full">
      <div className="flex justify-between gap-4 flex-wrap">
        <CommentsTitle
          courseName={teacherClass.course.name}
          teacherName={teacherClass.teacher.name}
          teacherLastName={teacherClass.teacher.last_name}
          difficulty={'Difícil'}
          className="flex-1"
        />
        <CourseTeacherRanking
          ranking={teacherClass.quality || 0}
          totalComments={teacherClass._count.comments}
        />
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
  );
};

export default page;
