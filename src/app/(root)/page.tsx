import React from "react";
import Navbar from "@/components/ui/Navbar";
import PostCard from "@/components/post/postCard";

function page() {
  return (
    <div className="flex-1 w-full overflow-y-auto relative">
      {/* <Navbar /> */}
      <div className="">
        {/* Simulate scrollable content */}
        {[...Array(50)].map((_, i) => (
          <PostCard key={i} />
        ))}
      </div>
    </div>
  );
}

export default page;
