import React from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

function PostFooter() {
  return (
    <div className="mt-5 flex gap-2">
      <GoHeart size={25} />
      <GoHeartFill className="text-red-500" size={25} />
    </div>
  );
}

export default PostFooter;
