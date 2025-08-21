import React from "react";

function HomeProfileSkeletonLoader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-[120px] h-[120px] rounded-full bg-gray-200 overflow-hidden animate-pulse"></div>
      <div className="flex flex-col gap-1">
        <div className="w-[250px] h-[30px] rounded-full bg-gray-200 animate-pulse"></div>
        <div className="w-[150px] h-[20px] rounded-full bg-gray-200 animate-pulse"></div>
        <div className="flex flex-col gap-1 mt-3">
          <div className="w-full max-w-[350px] h-[20px] rounded-full bg-gray-200 animate-pulse"></div>
          <div className="w-full max-w-[350px] h-[20px] rounded-full bg-gray-200 animate-pulse"></div>
          <div className="w-full max-w-[300px] h-[20px] rounded-full bg-gray-200 animate-pulse"></div>
        </div>
        <div className="w-[150px] h-[20px] rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
}

export default HomeProfileSkeletonLoader;
