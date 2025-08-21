import { useState } from "react";
import { CreatePostPayload, Post } from "@/types/post";
import toast from "react-hot-toast";

// Types
type GetPostsResponse = {
  data: Post[];
  count?: number;
};

export function useMutatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For fetching posts
  const [fetchingPosts, setFetchingPosts] = useState(true);

  async function createPost({
    content,
  }: Omit<CreatePostPayload, "author_id">): Promise<Post | null> {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create post");

      toast.success("Post created successfully!");
      return data as Post;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      toast.error("Failed to create post");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    createPost,
    loading,
    error,
  };
}
