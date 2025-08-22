// components/post/PostCardContainer.tsx

import React from "react";
import PostHeader from "./post-header";
import PostBody from "./post-body";
import PostFooter from "./post-footer";
import { Post } from "@/schemas/post";

interface PostCardProps {
  postData: Post;
}

function PostCard({ postData }: PostCardProps) {
  console.log("PostCard:", postData);
  return (
    <div className="p-6 border-b-[1px] border-border">
      <PostHeader
        postData={postData.author}
        createdAt={postData.created_at}
        post_id={postData.id}
      />
      <PostBody postData={postData} />
      <PostFooter
        postId={postData.id}
        initialLiked={postData.isLiked ?? false}
        initialLikeCount={postData.likeCount ?? 0}
      />
    </div>
  );
}

export default PostCard;
