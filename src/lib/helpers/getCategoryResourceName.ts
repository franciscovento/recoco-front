import { ResourceCategory } from '../interfaces/resources.interface';

export const getCategoryResourceName = (category: ResourceCategory) => {
  switch (category) {
    case 'exams':
      return 'Exámenes';
    case 'resumes':
      return 'Currículums';
    case 'books':
      return 'Libros';
    case 'videos':
      return 'Videos';
    case 'other':
      return 'Otros';
  }
};
