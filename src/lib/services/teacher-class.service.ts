import instance from '../helpers/axios.helpers';
import { Resource, ResourceResponse } from '../interfaces/resource.interface';
import { TeacherClass } from '../interfaces/teacher-class.interface';

const getTeacherClassById = (teacher_id: number, course_id: number) => {
  return instance.get<TeacherClass>(
    `/teacher-class/${teacher_id}/${course_id}/`
  );
};

const getTeacherClassResources = (teacher_id: number, course_id: number) => {
  return instance.get<ResourceResponse>(
    `/teacher-class/${teacher_id}/${course_id}/resources`
  );
};

const createTeacherClassResource = (
  teacher_id: number,
  course_id: number,
  resource: Partial<Resource>
) => {
  return instance.post<ResourceResponse>(
    `/teacher-class/${teacher_id}/${course_id}/resources`,
    resource
  );
};

export {
  getTeacherClassById,
  getTeacherClassResources,
  createTeacherClassResource,
};
