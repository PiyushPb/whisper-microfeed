/* eslint-disable @next/next/no-img-element */
import React from "react";
import SignupFormContainer from "@/components/auth/SignupFormContainer";

function SignupPage() {
  return (
    <main className="w-full h-screen flex justify-center items-center p-5">
      <div className="w-full h-full bg-red-200 rounded-xl overflow-hidden md:block hidden relative">
        <img
          src="/assets/image/authThumbnail2.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <h1 className="absolute bottom-[50px] left-[50px] text-5xl text-white">
          @whisper
        </h1>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="max-w-[500px] w-full z-10">
          <SignupFormContainer />
        </div>
      </div>
    </main>
  );
}

export default SignupPage;
