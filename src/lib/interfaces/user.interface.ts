interface User {
  id: string;
  email: string;
  password?: string;
  username: string;
  rol: string;
  status: string;
  is_verified: boolean;
  profile_img: string;
  university_id: string;
  degree_id: string;
  created_at: string;
  updated_at: string;
}
export type { User };
