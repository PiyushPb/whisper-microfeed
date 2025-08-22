import { z } from "zod";

// 👇 Environment variable-based content limit fallback
const MAX_CONTENT_LENGTH = Number(
  process.env.NEXT_PUBLIC_MAX_POST_CONTENT_LIMIT || 280
);

const authorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  username: z.string(),
  profile_url: z.string(),
  is_verified: z.boolean(),
  created_at: z.string().optional(),
});

export const postSchema = z.object({
  id: z.string().uuid(),
  author_id: z.string().uuid().optional(),
  content: z.string().min(1).max(MAX_CONTENT_LENGTH),
  created_at: z.string(),
  updated_at: z.string(),
  author: authorSchema,
  isLiked: z.boolean().optional(),
  likeCount: z.number().optional(),
});

export const createPostSchema = z.object({
  content: z.string().min(1, "Content is required").max(MAX_CONTENT_LENGTH),
});

export type Post = z.infer<typeof postSchema>;
export type CreatePostPayload = z.infer<typeof createPostSchema>;
