import React from "react";

function PostBodySkeleton() {
  return (
    <div className="w-full p-5 border-b-1 border-border">
      {/* header */}
      <div className="flex justify-between items-center ">
        <div className="flex flex-row items-center gap-4">
          <div>
            {/* user image */}
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-200 animate-pulse"></div>
          </div>
          <div>
            {/* user info */}
            <div className="flex flex-col gap-1">
              <div className="w-[150px] h-[20px] bg-gray-200 rounded-[8px] animate-pulse"></div>
              <div className="w-[90px] h-[15px] bg-gray-200 rounded-[8px] animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 mt-3">
          <div className="w-[50px] h-[15px] rounded-[8px] bg-gray-200 animate-pulse"></div>
          <div className="w-[50px] h-[15px] rounded-[8px] bg-gray-200 animate-pulse"></div>
        </div>
      </div>
      {/* body */}
      <div className="flex flex-col gap-2 mt-3">
        <div className="w-full h-[15px] rounded-[8px] bg-gray-200 animate-pulse"></div>
        <div className="w-full h-[15px] rounded-[8px] bg-gray-200 animate-pulse"></div>
        <div className="w-[60%] h-[15px] rounded-[8px] bg-gray-200 animate-pulse"></div>
      </div>
      {/* footer */}
      <div className="flex flex-row items-center gap-2 mt-3">
        <div className="w-[50px] h-[15px] rounded-[8px] bg-gray-200 animate-pulse"></div>
        <div className="w-[50px] h-[15px] rounded-[8px] bg-gray-200 animate-pulse"></div>
        <div className="w-[50px] h-[15px] rounded-[8px] bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
}

export default PostBodySkeleton;
