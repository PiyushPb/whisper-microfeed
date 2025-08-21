"use client";

import React, { useEffect, useState } from "react";
import PostCard from "@/components/post/PostCardContainer";
import CreatePostContainer from "@/components/post/CreatePostContainer";
import { useMutatePost } from "@/hooks/use-mutate-post";
import PostBodySkeleton from "@/components/skeleton/PostBodySkeleton";
import { Post } from "@/types/post";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MAX_POSTS_PER_PAGE = 10;

function HomePage() {
  const { getPosts, fetchingPosts } = useMutatePost();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPosts = async (page: number) => {
    setLoading(true);
    const response = await getPosts(page, MAX_POSTS_PER_PAGE);
    setPosts(response?.data || []);
    setTotalPages(Math.ceil((response?.count || 0) / MAX_POSTS_PER_PAGE));
    setLoading(false);
  };

  useEffect(() => {
    loadPosts(currentPage);
  }, [currentPage]);

  // Handle page changes
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex-1 w-full overflow-y-auto relative">
      <CreatePostContainer refetchPosts={() => loadPosts(currentPage)} />
      <div className="">
        {loading ? (
          [...Array(MAX_POSTS_PER_PAGE)].map((_, i) => (
            <PostBodySkeleton key={i} />
          ))
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground mt-5">
            No posts yet.
          </p>
        ) : (
          posts.map((post, i) => <PostCard key={i} postData={post} />)
        )}
      </div>

      {/* Pagination controls */}
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
            {/* Display page numbers */}
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
                onClick={() => handlePageChange(currentPage + 1)} // Go to next page
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default HomePage;
