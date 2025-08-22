// PostPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostListContainer from "@/components/post/PostListContainer";
import { Post } from "@/schemas/post";

function PostPage() {
  const params = useParams();
  const postid = params?.postid;
  const [post, setPost] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async (postid: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts/${postid}`);
      const data = await res.json();

      if (!data) {
        setError("Post not found");
      }

      setPost([data.post]);

      console.log(data);
    } catch (error) {
      console.log(error);
      setError("Something went wrong while fetching posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost(postid as string);
  }, [postid]);

  return (
    <div>
      <PostListContainer
        posts={post || []}
        count={1}
        loading={loading}
        error={error}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
        fallBackText="No posts found"
      />
    </div>
  );
}

export default PostPage;
