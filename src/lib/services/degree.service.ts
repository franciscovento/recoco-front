import instance from '../helpers/axios.helpers';
import { Degree } from '../interfaces/degree.interface';

const getDegreeById = (id: string) => {
  return instance.get<Degree>(`/degree/${id}`);
};

export { getDegreeById };
