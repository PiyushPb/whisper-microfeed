"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import PostCard from "@/components/post/PostCardContainer";
import CreatePostContainer from "@/components/post/CreatePostContainer";
import { useMutatePost } from "@/hooks/use-mutate-post";
import PostBodySkeleton from "@/components/skeleton/PostBodySkeleton";
import { Post } from "@/types/post";

function HomePage() {
  const { getPosts, fetchingPosts } = useMutatePost();
  const [posts, setPosts] = React.useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const posts = await getPosts(1, 10);
      setPosts(posts?.data || []);
    }
    loadPosts();
  }, []);

  if (fetchingPosts) {
    return (
      <div className="flex-1 w-full overflow-y-auto relative">
        <CreatePostContainer />
        <div className="">
          {[...Array(10)].map((_, i) => (
            <PostBodySkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full overflow-y-auto relative">
      <CreatePostContainer />
      <div className="">
        {posts.map((post, i) => (
          <PostCard key={i} postData={post} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
