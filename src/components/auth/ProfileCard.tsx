/* eslint-disable @next/next/no-img-element */
import React from "react";
import HomeProfileSkeletonLoader from "../skeleton/HomeProfileSkeletonLoader";
import { GoVerified } from "react-icons/go";
import { formatURL } from "@/utils/formatUrl";
import { TbExternalLink } from "react-icons/tb";
import LogoutButton from "./LogoutButton";
import { User } from "@/types/user";
import { useAuth } from "@/context/AuthContext";

function ProfileCard({
  user,
  loading,
  currentUser = false,
}: {
  user: User | null;
  loading: boolean;
  currentUser: boolean;
}) {
  if (loading) return <HomeProfileSkeletonLoader />;

  return (
    <div className="flex flex-col gap-2">
      <div className="w-[120px] h-[120px] rounded-full bg-gray-200 overflow-hidden">
        <img
          src={user?.profile_url || "/assets/image/avatar.png"}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="text-[1.5rem] font-semibold">{user?.name}</h4>
        <div className="flex flex-row gap-1 items-center">
          <p className="text-[16px] text-gray-600">@{user?.username}</p>
          {user?.is_verified && (
            <GoVerified size={15} className="text-blue-500" />
          )}
        </div>
        <p className="text-[12px] text-gray-600 mt-3">{user?.bio}</p>
      </div>
      {user?.url && (
        <div className="flex gap-2 justify-start items-center group cursor-pointer w-fit">
          <a
            href={user?.url}
            target="_blank"
            className="group-hover:text-blue-500 group-hover:underline"
          >
            {formatURL(user?.url)}
          </a>{" "}
          <TbExternalLink className="group-hover:text-blue-500" />
        </div>
      )}
      {currentUser && (
        <div className="mt-10">
          <LogoutButton />
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
