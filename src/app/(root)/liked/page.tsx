"use client";
import PostListContainer from "@/components/post/PostListContainer";
import { useLikedPosts } from "@/hooks/usePosts";
import React, { useState } from "react";

const MAX_POSTS_PER_PAGE = 10;

function LikedPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, count, loading, error } = useLikedPosts(
    currentPage,
    MAX_POSTS_PER_PAGE
  );

  const totalPages = Math.ceil((count || 0) / MAX_POSTS_PER_PAGE);

  // Handle page changes
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex-1 w-full overflow-y-auto relative">
      <div className="w-full p-5 border-b-[1px] border-border">
        <h2 className="text-[24px] calSans">Posts liked by you </h2>
      </div>
      <PostListContainer
        posts={posts}
        count={count}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default LikedPage;
