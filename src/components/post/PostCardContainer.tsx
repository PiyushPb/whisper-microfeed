import React from "react";
import PostHeader from "./post-header";
import PostBody from "./post-body";
import PostFooter from "./post-footer";
import { Post } from "@/types/post";

interface PostCardProps {
  postData: Post;
}

function PostCard({ postData }: PostCardProps) {
  console.log(postData);

  return (
    <div className="p-6 border-b-[1px] border-border">
      <PostHeader postData={postData} />
      <PostBody postData={postData} />
      <PostFooter />
    </div>
  );
}

export default PostCard;
