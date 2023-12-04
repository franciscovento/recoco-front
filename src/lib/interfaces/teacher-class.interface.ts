export interface TeacherClass {
  course_id: number;
  teacher_id: number;
  teacher_class_name?: string;
  quality: null;
  difficulty: null;
  status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  course: Course;
  teacher: Teacher;
  user: User;
  _count: Count;
}

export interface Count {
  comments: number;
}

export interface Course {
  course_code: string;
  name: string;
  short_name: string;
}

export interface Teacher {
  name: string;
  last_name: string;
  score: number | null;
}

export interface User {
  username: string;
}
