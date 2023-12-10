import { DegreeCourse } from '../interfaces/degree.interface';

const orderCoursesByName = (courses: DegreeCourse[]) => {
  const copyCourses = [...courses];
  const orderedCourses = copyCourses.sort((a, b) =>
    a.course.name.localeCompare(b.course.name)
  );
  return orderedCourses;
};

export { orderCoursesByName };
