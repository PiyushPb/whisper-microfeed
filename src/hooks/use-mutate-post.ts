"use client";

import { CreatePostPayload, Post } from "@/schemas/post";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export function useMutatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

export function usePostDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deletePost(postId: string) {
    setLoading(true);
    setError(null);

    try {
      setLoading(true);

      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete post");

      toast.success("Post deleted successfully!");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    deletePost,
    loading,
    error,
  };
}

export function useGetSinglePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSinglePost = useCallback(
    async (postId: string): Promise<Post | null> => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/posts/${postId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch post");

        return data.post as Post;
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    getSinglePost,
    loading,
    error,
  };
}

export function useUpdatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updatePost(
    postId: string,
    content: string
  ): Promise<Post | null> {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update post");

      toast.success("Post updated successfully!");
      return data.post as Post;
    } catch (err) {
      toast.error("Update failed");
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    updatePost,
    loading,
    error,
  };
}
