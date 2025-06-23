export interface ResourceResponse {
  message: string;
  data: Resource[];
}

export interface Resource {
  id: number;
  name: string;
  url: string;
  category: ResourceCategory;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  course_id: number;
  teacher_id: number;
  reports: number;
  is_reported_by_user?: boolean;
}

export type ResourceCategory =
  | 'exams'
  | 'resumes'
  | 'books'
  | 'videos'
  | 'other';
