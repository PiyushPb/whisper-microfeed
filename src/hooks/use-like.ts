// hooks/use-like.ts
"use client";

import { useState, useRef } from "react";

type UseLikeArgs = {
  postId: string;
  initialLiked: boolean;
  initialLikeCount: number;
};

type UseLikeReturn = {
  isLiked: boolean;
  likeCount: number;
  isLoading: boolean;
  error: string | null;
  toggleLike: () => Promise<void>;
};

export function useLikePost({
  postId,
  initialLiked,
  initialLikeCount,
}: UseLikeArgs): UseLikeReturn {
  const [isLiked, setIsLiked] = useState<boolean>(initialLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inflight = useRef(false);

  const toggleLike = async () => {
    if (isLoading || inflight.current) return;
    setError(null);
    setIsLoading(true);
    inflight.current = true;

    try {
      const method = isLiked ? "DELETE" : "POST";
      const res = await fetch(`/api/posts/${postId}/like`, { method });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Failed to toggle like");

      // Always trust the server
      setIsLiked(Boolean(data.liked));
      setLikeCount(
        typeof data.likeCount === "number" ? data.likeCount : likeCount
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsLoading(false);
      inflight.current = false;
    }
  };

  return { isLiked, likeCount, isLoading, error, toggleLike };
}
