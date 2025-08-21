export interface AuthorProfile {
  id: string;
  name: string;
  username: string;
  profile_url: string;
  is_verified: boolean;
  created_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: AuthorProfile;
}

export interface PostsResponse {
  count: number;
  payload: Post[];
}

export type CreatePostPayload = {
  content: string;
  author_id: string;
};
