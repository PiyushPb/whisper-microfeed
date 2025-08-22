"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import ProfileCard from "../auth/ProfileCard";

function LeftSection() {
  const { user, loading } = useAuth();

  return (
    <aside className="w-full lg:w-[25%] h-fit lg:h-screen md:sticky top-0 border-r-1 border-border z-[1000] bg-white">
      <div className="w-full h-fit p-5 lg:h-[100px] flex justify-center items-center border-b-1 border-border">
        <h1 className="text-3xl text-center">@whisper</h1>
      </div>
      <div className="p-10 hidden lg:flex  flex-col justify-between">
        <ProfileCard user={user} loading={loading} currentUser={true} />
      </div>
    </aside>
  );
}

export default LeftSection;
