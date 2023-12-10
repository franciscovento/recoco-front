import instance from '../helpers/axios.helpers';
import { University } from '../interfaces/university.interface';

const getUniversityBySlug = (slug: string) => {
  return instance.get<{ message: string; data: University }>(
    `/university/by-slug/${slug}`
  );
};

const getUniversities = () => {
  return instance.get<{ message: string; data: University[] }>('/university/');
};
export { getUniversityBySlug, getUniversities };
