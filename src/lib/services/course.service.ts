import instance from '../helpers/axios.helpers';
import { Course } from '../interfaces/course.interface';

const getCourseById = (id: string) => {
  return instance.get<Course>(`/course/${id}`);
};

export { getCourseById };
