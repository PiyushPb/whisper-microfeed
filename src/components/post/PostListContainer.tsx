// components/post/PostListContainer.tsx
import React from "react";
import { Post } from "@/types/post";
import PostCard from "@/components/post/PostCardContainer";
import PostBodySkeleton from "@/components/skeleton/PostBodySkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PostListContainerProps {
  posts: Post[];
  count: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  fallBackText: string;
  onPageChange: (page: number) => void;
}

const PostListContainer: React.FC<PostListContainerProps> = ({
  posts,
  count,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  fallBackText,
}) => {
  return (
    <div className="w-full">
      {/* Display posts or loading skeleton */}
      <div>
        {loading ? (
          [...Array(10)].map((_, i) => <PostBodySkeleton key={i} />)
        ) : error ? (
          <p className="text-center text-red-500 mt-5">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground mt-5">
            {fallBackText || "No posts found"}
          </p>
        ) : (
          posts.map((post: Post) => <PostCard key={post.id} postData={post} />)
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-5">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={() => onPageChange(page)}
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
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default PostListContainer;
