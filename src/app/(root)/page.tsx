import React from "react";
import Navbar from "@/components/ui/Navbar";
import PostCard from "@/components/post/PostCardContainer";
import CreatePostContainer from "@/components/post/CreatePostContainer";

function page() {
  return (
    <div className="flex-1 w-full overflow-y-auto relative">
      <CreatePostContainer />
      <div className="">
        {[...Array(50)].map((_, i) => (
          <PostCard key={i} />
        ))}
      </div>
    </div>
  );
}

export default page;
