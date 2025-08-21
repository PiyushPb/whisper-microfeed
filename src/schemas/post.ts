import { z } from "zod";

// 👇 Environment variable-based content limit fallback
const MAX_CONTENT_LENGTH = Number(
  process.env.NEXT_PUBLIC_MAX_POST_CONTENT_LIMIT || 280
);

export const postSchema = z.object({
  id: z.string().uuid(),
  author_id: z.string().uuid(),
  content: z.string().min(1).max(MAX_CONTENT_LENGTH),
  created_at: z.string(),
  updated_at: z.string(),
});

export const createPostSchema = z.object({
  content: z.string().min(1, "Content is required").max(MAX_CONTENT_LENGTH),
});

export type Post = z.infer<typeof postSchema>;
export type CreatePostPayload = z.infer<typeof createPostSchema>;
