export interface Degree {
  id: number;
  name: string;
  description: string;
  slug: string;
  duration: null;
  status: string;
  faculty_id: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  faculty: Faculty;
}

export interface Faculty {
  id: number;
  name: string;
  status: string;
  slug: null;
  university_id: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  university: University;
}

export interface University {
  id: number;
  name: string;
  country_id: number;
  website: string;
  phone: string;
  slug: null;
  status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface DegreeCourse {
  degree_id: number;
  course_id: number;
  created_at: string;
  updated_at: string;
  created_by: string;
  course: Course;
}

export interface Course {
  name: string;
  course_code: string;
  short_name: string;
  faculty_id: number;
  created_at: string;
  created_by: string;
  status: string;
  courseTeacher: { _count: { comments: number } }[];
  _count: Count;
}

export interface Count {
  courseTeacher: number;
}
