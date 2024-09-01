export type University = {
  id: string;
  name: string;
  country_id: number;
  website: string;
  slug: string;
  phone: string;
  status: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  country: { id: number; name: string };
};
