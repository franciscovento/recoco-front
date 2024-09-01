import instance from '../helpers/axios.helpers';
import { ApiResponse } from '../interfaces/apiResponse.interface';
import { University } from '../interfaces/university.interface';

const getUniversityBySlug = (slug: string) => {
  return instance.get<{ message: string; data: University }>(
    `/university/by-slug/${slug}`
  );
};

const getUniversities = () => {
  return instance.get<ApiResponse<University[]>>('/university/');
};
export { getUniversityBySlug, getUniversities };
