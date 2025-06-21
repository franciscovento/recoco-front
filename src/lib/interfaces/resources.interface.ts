export interface TeacherClassResourceResponse {
  message: string;
  data: TeacherClassResource[];
}

export interface TeacherClassResource {
  id: number;
  name: string;
  url: string;
  category: ResourceCategory;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  course_id: number;
  teacher_id: number;
}

export type ResourceCategory =
  | 'exams'
  | 'resumes'
  | 'books'
  | 'videos'
  | 'other';
