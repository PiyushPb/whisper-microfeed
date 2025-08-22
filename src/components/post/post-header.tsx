/* eslint-disable @next/next/no-img-element */
"use client";

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
import { useAuth } from "@/context/AuthContext";
import { calculatePostTime } from "@/utils/calculatePostTime";
import { useModal } from "@/context/ModalContext";
import { usePostDelete } from "@/hooks/use-mutate-post";

interface PostHeaderProps {
  postData: {
    id: string;
    name: string;
    username: string;
    profile_url: string;
    is_verified: boolean;
  };
  createdAt: string;
  post_id: string;
}

function PostHeader({ postData, createdAt, post_id }: PostHeaderProps) {
  const { user } = useAuth();
  const { openModal, closeModal } = useModal();
  const { deletePost, loading } = usePostDelete();

  const timeAgo = calculatePostTime({ time: createdAt });

  const handleDelete = async () => {
    const result = await deletePost(post_id);
    if (result) {
      closeModal();
      window.location.reload();
    }
  };

  const handleEdit = async () => {
    console.log("Edit post");
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-5">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          <img
            src={postData?.profile_url || "/assets/image/avatar.jpg"}
            alt=""
          />
        </div>
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
          <DropdownMenuTrigger className="cursor-pointer outline-none">
            <GoKebabHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <GoLink /> Share
            </DropdownMenuItem>
            {postData?.id === user?.id && (
              <>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    openModal("edit", {
                      post_id: post_id,
                      onConfirm: handleEdit,
                      loading,
                    });
                  }}
                >
                  <GoPencil /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={() =>
                    openModal("delete", { onConfirm: handleDelete, loading })
                  }
                >
                  <GoTrash /> Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default PostHeader;
