import { getCourseById } from '@/lib/services/course.service';
import { CourseTeachersCard } from '@/ui/organisms/CourseTeachersCard';
import CreateTeacherClass from '@/ui/organisms/forms/CreateTeacherClass';

export default async function ApplicationLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: { course_id: string };
}) {
  const { data: courseResponse } = await getCourseById(params.course_id);
  const course = courseResponse?.data;
  const courseId = +params.course_id;
  const facultyId = +course.faculty_id;

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh_-_70px)] gap-8 p-4 sm:p-6">
      <div className="w-full lg:w-[430px] flex flex-col gap-8">
        <CourseTeachersCard
          courseId={+params.course_id}
          courseCode={course.course_code}
          courseTag={course.course_code}
          courseName={course.name}
        />

        <CreateTeacherClass courseId={courseId} facultyId={facultyId} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
