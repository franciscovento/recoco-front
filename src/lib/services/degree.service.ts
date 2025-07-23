import { message } from 'antd';
import instance from '../helpers/axios.helpers';
import { Degree } from '../interfaces/degree.interface';

const getDegreeById = async (id: string) => {
  try {
    const resp = await instance.get<{ message: string; data: Degree }>(
      `/degree/${id}`
    );
    return {
      data: resp.data,
      success: true,
      message: resp.data.message,
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: 'Error al obtener el grado',
    };
  }
};

const getDegreesByFacultyId = (facultyId: string) => {
  return instance.get<{ message: string; data: Degree[] }>(
    `/degree/by-faculty/${facultyId}`
  );
};

export { getDegreeById, getDegreesByFacultyId };
