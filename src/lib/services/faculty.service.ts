import instance from '../helpers/axios.helpers';
import { ApiResponse } from '../interfaces/apiResponse.interface';
import { Faculty } from '../interfaces/faculty.interface';

const getFacultiesByUniversitySlug = async (universitySlug: string) => {
  return instance.get<ApiResponse<Faculty[]>>(
    `/faculty/by-university-slug/${universitySlug}`
  );
};

const getFacultyById = async (facultyId: string) => {
  return instance.get<ApiResponse<Faculty>>(`/faculty/${facultyId}`);
};
export {
  getFacultiesByUniversitySlug as getFacultiesByUniversityId,
  getFacultyById,
};
