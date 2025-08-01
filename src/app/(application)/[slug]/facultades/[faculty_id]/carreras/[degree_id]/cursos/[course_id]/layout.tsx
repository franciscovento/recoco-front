import { getCourseById } from '@/lib/services/course.service';
import { CourseTeachersCard } from '@/ui/organisms/CourseTeachersCard';
import CreateTeacherClass from '@/ui/organisms/forms/CreateTeacherClass';
import Header from '@/ui/organisms/Header';
import { appRoutes } from '../../../../../../../../../../routes';

export default async function ApplicationLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: {
    course_id: string;
    faculty_id: string;
    degree_id: string;
    slug: string;
  };
}) {
  const { data: courseResponse } = await getCourseById(params.course_id);
  const course = courseResponse?.data;
  const courseId = +params.course_id;
  const facultyId = +params.faculty_id;
  const degreeId = +params.degree_id;

  return (
    <>
      <Header
        headerName={'Ver todos los cursos'}
        headerHref={appRoutes.facultades.carreras.detail(
          params.slug,
          facultyId,
          degreeId
        )}
      />
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh_-_70px)] gap-8 p-4 sm:p-6">
        <div className="w-full lg:w-[430px] flex flex-col gap-8">
          <CourseTeachersCard
            facultyId={facultyId}
            degreeId={degreeId}
            courseId={+params.course_id}
            courseCode={course.course_code}
            courseTag={course.course_code}
            courseName={course.name}
          />

          <CreateTeacherClass courseId={courseId} facultyId={facultyId} />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
