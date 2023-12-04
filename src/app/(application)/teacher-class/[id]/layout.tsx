import { getCourseById } from '@/lib/services/course.service';
import Card from '@/ui/atoms/Card';
import { CourseTeachersCard } from '@/ui/organisms/CourseTeachersCard';
import CreateTeacherClass from '@/ui/organisms/forms/CreateTeacherClass';

export default async function ApplicationLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { data: course } = await getCourseById(params.id);
  const courseId = +params.id;
  const facultyId = +course.faculty_id;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-8 p-4 sm:p-6">
      <div className="w-full lg:w-[430px] flex flex-col gap-8">
        <CourseTeachersCard
          courseId={+params.id}
          courseCode={course.course_code}
          courseTag={course.short_name}
          courseName={course.name}
        />

        <CreateTeacherClass courseId={courseId} facultyId={facultyId} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
