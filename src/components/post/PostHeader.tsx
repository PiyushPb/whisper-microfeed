/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  GoKebabHorizontal,
  GoLink,
  GoPencil,
  GoVerified,
  GoTrash,
} from "react-icons/go";

function PostHeader() {
  return (
    <div>
      <div>
        <ProfileInfo />
      </div>
    </div>
  );
}

const ProfileInfo = () => {
  return (
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
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <GoKebabHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <GoLink /> Share
            </DropdownMenuItem>
            <DropdownMenuItem>
              <GoPencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <GoTrash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PostHeader;
