//page.tsx
"use client";

import React, { useState } from "react";
import PostCard from "@/components/post/PostCardContainer";
import CreatePostContainer from "@/components/post/CreatePostContainer";
import PostBodySkeleton from "@/components/skeleton/PostBodySkeleton";
import { Post } from "@/types/post";
import { usePosts } from "@/hooks/usePosts"; // 👈 new hook
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MAX_POSTS_PER_PAGE = 10;

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ fetch posts using the hook
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

  return (
    <div className="flex-1 w-full overflow-y-auto relative">
      <CreatePostContainer refetchPosts={() => refetch()} />

      <div>
        {loading ? (
          [...Array(MAX_POSTS_PER_PAGE)].map((_, i) => (
            <PostBodySkeleton key={i} />
          ))
        ) : error ? (
          <p className="text-center text-red-500 mt-5">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground mt-5">
            No posts yet.
          </p>
        ) : (
          posts.map((post: Post) => <PostCard key={post.id} postData={post} />)
        )}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="p-5">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default HomePage;
