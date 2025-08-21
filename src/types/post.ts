export type Post = {
  id: string;
  author_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type CreatePostPayload = {
  content: string;
  author_id: string;
};
