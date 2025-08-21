// components/post/PostCardContainer.tsx

import React from "react";
import PostHeader from "./post-header";
import PostBody from "./post-body";
import PostFooter from "./post-footer";
import { Post } from "@/types/post";

interface PostCardProps {
  postData: Post;
}

function PostCard({ postData }: PostCardProps) {
  return (
    <div className="p-6 border-b-[1px] border-border">
      <PostHeader postData={postData.author} createdAt={postData.created_at} />
      <PostBody postData={postData} />
      <PostFooter
        postId={postData.id}
        initialLiked={postData.isLiked}
        initialLikeCount={postData.likeCount}
      />
    </div>
  );
}

export default PostCard;
