export type User = {
  id: string;
  name: string;
  email?: string | null;
  username: string;
  profile_url?: string | null;
  bio?: string | null;
  url?: string;
  is_verified?: boolean | null;
  created_at: string;
  updated_at?: string | null;
};
