import React from "react";
import PostHeader from "./post-header";
import PostBody from "./post-body";
import PostFooter from "./post-footer";

function PostCard() {
  return (
    <div className="p-6 border-b-[1px] border-border">
      <PostHeader />
      <PostBody />
      <PostFooter />
    </div>
  );
}

export default PostCard;
