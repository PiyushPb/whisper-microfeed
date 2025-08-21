"use client";

import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "@/components/ui/searchBar";
import { Post } from "@/schemas/post";
import PostListContainer from "@/components/post/PostListContainer";
import { debounce } from "@/utils/debounce";

const MAX_POSTS_PER_PAGE = 10;

function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);

  const totalPages = Math.ceil((count || 0) / MAX_POSTS_PER_PAGE);

  const handleSearch = async (searchValue: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/posts/search?search=${searchValue}&page=${page}&limit=${MAX_POSTS_PER_PAGE}`
      );
      const data = await res.json();
      setPosts(data.payload);
      setCount(data.count ?? 0);
    } catch (error: any) {
      setError("Something went wrong while fetching posts.");
    } finally {
      setLoading(false);
    }
  };

  // Wrap with debounce
  const debouncedSearch = useCallback(
    debounce((searchValue: string, page: number) => {
      handleSearch(searchValue, page);
    }, 500), // 500ms delay
    []
  );

  useEffect(() => {
    if (!search.trim()) {
      setPosts([]);
      setCount(0);
      return;
    }
    debouncedSearch(search, currentPage);
  }, [search, currentPage, debouncedSearch]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <section className="p-5">
      <SearchBar search={search} setSearch={setSearch} />
      <PostListContainer
        posts={posts}
        count={count}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        fallBackText="Search for posts (Posts will be searched based on the content)"
      />
    </section>
  );
}

export default SearchPage;
