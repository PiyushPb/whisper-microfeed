"use client";

import { useEffect, useState, useCallback } from "react";

type Author = {
  id: string;
  name: string;
  username: string;
  is_verified: boolean;
  profile_url: string;
};

type Post = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: Author;
  likeCount: number;
  isLiked: boolean;
};

type GetPostsResponse = {
  payload: Post[];
  count: number;
};

export function usePosts(page = 1, limit = 10) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/posts?page=${page}&limit=${limit}`);
      const data: GetPostsResponse = await res.json();

      if (!res.ok)
        throw new Error((data as any).error || "Failed to fetch posts");

      setPosts(data.payload);
      setCount(data.count);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, count, loading, error, refetch: fetchPosts };
}
