import instance from '../helpers/axios.helpers';
import { Degree } from '../interfaces/degree.interface';

const getDegreeById = (id: string) => {
  return instance.get<{ message: string; data: Degree }>(`/degree/${id}`);
};

const getDegreesByFacultyId = (facultyId: string) => {
  return instance.get<{ message: string; data: Degree[] }>(
    `/degree/by-faculty/${facultyId}`
  );
};

export { getDegreeById, getDegreesByFacultyId };
