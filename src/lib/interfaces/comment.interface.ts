export type Comment = {
  comment: string;
  status: 'approved' | 'onReview' | 'pending' | 'deleted' | 'spam' | 'rejected';
  difficulty: number;
  quality: number;
  likes: number;
  disLikes: number;
  course_id: string;
  teacher_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  dislikes: number;
};
