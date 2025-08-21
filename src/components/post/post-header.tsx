/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  GoKebabHorizontal,
  GoLink,
  GoPencil,
  GoTrash,
  GoVerified,
} from "react-icons/go";
import { Post } from "@/types/post";
import { useAuth } from "@/context/AuthContext";
import { calculatePostTime } from "@/utils/calculatePostTime";

interface PostHeaderProps {
  postData: {
    id: string;
    name: string;
    username: string;
    profile_url: string;
    is_verified: boolean;
  };
  createdAt: string;
}

function PostHeader({ postData, createdAt }: PostHeaderProps) {
  const author_id = postData?.id;
  const { user } = useAuth();
  const timeAgo = calculatePostTime({ time: createdAt });

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          {/* user image avatar */}
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={postData?.profile_url || "/assets/image/avatar.jpg"}
              alt=""
            />
          </div>
          {/* userName */}
          <div className="flex flex-col">
            <h3 className="text-[1.2rem]">{postData?.name}</h3>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-[14px] text-gray-600">@{postData?.username}</p>
              {postData?.is_verified && (
                <GoVerified size={15} className="text-blue-500" />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-gray-500">{timeAgo}</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer outline-none focus:outline-none">
              <GoKebabHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                <GoLink /> Share
              </DropdownMenuItem>

              {author_id === user?.id && (
                <>
                  <DropdownMenuItem className="cursor-pointer">
                    <GoPencil />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    variant="destructive"
                  >
                    <GoTrash />
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
