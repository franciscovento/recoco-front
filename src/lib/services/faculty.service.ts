import instance from '../helpers/axios.helpers';
import { ApiResponse } from '../interfaces/apiResponse.interface';
import { Faculty } from '../interfaces/faculty.interface';

const getFacultiesByUniversityId = async (universityId: string) => {
  return instance.get<ApiResponse<Faculty[]>>(
    `/faculty/by-university/${universityId}`
  );
};

export { getFacultiesByUniversityId };
