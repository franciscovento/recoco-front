export type TeacherClass = {
  course_id: string;
  teacher_id: string;
  quality: number | null;
  difficulty: number | null;
  status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  course: {
    course_code: string;
    name: string;
    short_name: string;
  };
  teacher: {
    name: string;
    last_name: string;
    score: number | null;
  };
  user: {
    username: string;
  };
};
