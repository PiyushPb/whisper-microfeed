import { Post } from "@/schemas/post";
import React from "react";

interface PostCardProps {
  postData: Post;
}

function PostBody({ postData }: PostCardProps) {
  return (
    <div className="mt-5">
      <p className="text-[14px] lg:text-[16px] text-[#121212]">
        {postData.content}
      </p>
    </div>
  );
}

export default PostBody;
