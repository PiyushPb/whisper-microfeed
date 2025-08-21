/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoKebabHorizontal, GoLink, GoPencil, GoTrash } from "react-icons/go";

function PostHeader() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          {/* user image avatar */}
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQFUXdU9BSUIrQ/profile-displayphoto-crop_800_800/B4DZhP6cxEGsAI-/0/1753687382984?e=1758758400&v=beta&t=Skkx3hucNzwwpK34xbkgjm_1EPDsgVjpkCdddmO1O-o"
              alt=""
            />
          </div>
          {/* userName */}
          <div className="flex flex-col">
            <h3 className="text-[1.2rem]">Piyush Pardeshi</h3>
            <span className="text-[14px] text-gray-600">@piyush</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-gray-500">2 min ago</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer outline-none focus:outline-none">
              <GoKebabHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                <GoLink /> Share
              </DropdownMenuItem>
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
