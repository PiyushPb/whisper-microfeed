/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { TbExternalLink } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/user";
import { formatURL } from "@/utils/formatUrl";
import { GoVerified } from "react-icons/go";
import HomeProfileSkeletonLoader from "../skeleton/HomeProfileSkeletonLoader";

function LeftSection() {
  const { user, loading } = useAuth();

  return (
    <aside className="w-full lg:w-[25%] h-fit lg:h-screen md:sticky top-0 border-r-1 border-border z-[1000] bg-white">
      <div className="w-full h-fit p-5 lg:h-[100px] flex justify-center items-center border-b-1 border-border">
        <h1 className="text-3xl text-center">@whisper</h1>
      </div>
      <div className="p-10 hidden lg:block">
        <ProfileCard user={user} loading={loading} />
      </div>
    </aside>
  );
}

const ProfileCard = ({
  user,
  loading,
}: {
  user: User | null;
  loading: boolean;
}) => {
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
    </div>
  );
};

export default LeftSection;
