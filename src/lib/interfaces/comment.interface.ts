export interface Comment {
  comment: string;
  difficulty: number;
  quality: number;
  likes: number;
  disLikes: number;
  status: 'approved' | 'onReview' | 'pending' | 'deleted' | 'spam' | 'rejected';
  course_id: number;
  teacher_id: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  user: User;
  commentLikes: CommentLike[];
}

export interface CommentLike {
  course_id: number;
  teacher_id: number;
  user_id: string;
  created_by: string;
  is_like: boolean;
}

export interface User {
  username: string;
  profile_img: null;
}
