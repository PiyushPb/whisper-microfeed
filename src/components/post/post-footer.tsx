// components/post/post-footer.tsx
"use client";

import { GoHeart, GoHeartFill } from "react-icons/go";
import { useLikePost } from "@/hooks/use-like";

interface PostFooterProps {
  postId: string;
  initialLiked: boolean;
  initialLikeCount: number;
}

export default function PostFooter({
  postId,
  initialLiked,
  initialLikeCount,
}: PostFooterProps) {
  const { isLiked, likeCount, isLoading, toggleLike } = useLikePost({
    postId,
    initialLiked,
    initialLikeCount,
  });

  return (
    <div className="mt-3 flex items-center gap-2">
      <button
        onClick={toggleLike}
        disabled={isLoading}
        className="flex items-center"
        aria-pressed={isLiked}
        aria-label={isLiked ? "Unlike" : "Like"}
      >
        {isLiked ? (
          <GoHeartFill className="text-red-500" size={22} />
        ) : (
          <GoHeart size={22} />
        )}
      </button>
      <span className="text-sm text-muted-foreground">{likeCount}</span>
    </div>
  );
}
