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

type ErrorResponse = {
  error: string;
};

// Type guard to check if data is ErrorResponse
function isErrorResponse(data: unknown): data is ErrorResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "error" in data &&
    typeof data.error === "string"
  );
}

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
      const data: unknown = await res.json();

      if (!res.ok) {
        if (isErrorResponse(data)) {
          throw new Error(data.error);
        } else {
          throw new Error("Failed to fetch posts");
        }
      }

      const response = data as GetPostsResponse;
      setPosts(response.payload);
      setCount(response.count);
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

export function useLikedPosts(page = 1, limit = 10) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `/api/posts/likedPosts?page=${page}&limit=${limit}`
      );
      const data: unknown = await res.json();

      if (!res.ok) {
        if (isErrorResponse(data)) {
          throw new Error(data.error);
        } else {
          throw new Error("Failed to fetch posts");
        }
      }

      const response = data as GetPostsResponse;
      setPosts(response.payload);
      setCount(response.count);
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

  return { posts, count, loading, error };
}

export function useGetPostById() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async (postId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/posts/${postId}`);
      const data = await res.json();

      if (!res.ok) {
        if (isErrorResponse(data)) {
          throw new Error(data.error);
        } else {
          throw new Error("Failed to fetch post");
        }
      }

      const response = data as Post;
      setPost(response);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    post,
    loading,
    error,
    fetchPost,
  };
}
