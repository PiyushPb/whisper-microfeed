// page.tsx
"use client";

import React, { useState } from "react";
import CreatePostContainer from "@/components/post/CreatePostContainer";
import { usePosts } from "@/hooks/usePosts"; // Hook to fetch posts
import PostListContainer from "@/components/post/PostListContainer";

const MAX_POSTS_PER_PAGE = 10;

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, count, loading, error, refetch } = usePosts(
    currentPage,
    MAX_POSTS_PER_PAGE
  );

  const totalPages = Math.ceil((count || 0) / MAX_POSTS_PER_PAGE);

  // Handle page changes
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePostCreated = () => {
    refetch();
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex-1 w-full overflow-y-auto relative">
      <CreatePostContainer refetchPosts={handlePostCreated} />

      {/* Pass posts data as props to PostList */}
      <PostListContainer
        posts={posts}
        count={count}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        fallBackText="No posts found"
      />
    </div>
  );
}

export default HomePage;
