import { University } from './university.interface';

interface Faculty {
  id: string;
  name: string;
  status: string;
  university_id: string;
  slug: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  university: University;
}

export { type Faculty };
