import instance from '../helpers/axios.helpers';
import { TeacherClass } from '../interfaces/teacher-class.interface';

const getTeacherClassById = (teacher_id: number, course_id: number) => {
  return instance.get<TeacherClass>(
    `/teacher-class/${teacher_id}/${course_id}/`
  );
};

export { getTeacherClassById };
