/* eslint-disable @next/next/no-img-element */
import React from "react";
import { TbExternalLink } from "react-icons/tb";

function LeftSection() {
  return (
    <aside className="w-full lg:w-[25%] h-fit lg:h-screen md:sticky top-0 border-r-1 border-border z-[1000] bg-white">
      <div className="w-full h-fit p-5 lg:h-[100px] flex justify-center items-center border-b-1 border-border">
        <h1 className="text-3xl text-center">@whisper</h1>
      </div>
      <div className="p-10 hidden lg:block">
        <ProfileCard />
      </div>
    </aside>
  );
}

const ProfileCard = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="w-[100px] h-[100px] rounded-full bg-gray-200 overflow-hidden">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D03AQFUXdU9BSUIrQ/profile-displayphoto-crop_800_800/B4DZhP6cxEGsAI-/0/1753687382984?e=1758758400&v=beta&t=Skkx3hucNzwwpK34xbkgjm_1EPDsgVjpkCdddmO1O-o"
          alt=""
        />
      </div>
      <div>
        <h4 className="text-[1.5rem] font-semibold">Piyush Pardeshi</h4>
        <h3 className="text-[1rem]">@piyush</h3>
        <p className="text-[12px] text-gray-600 mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, ab
          veniam quas rem iste tempora illo placeat? Natus fuga quia aperiam
          magnam cumque blanditiis expedita dolorum eos sunt. Labore,
          doloremque.
        </p>
      </div>
      <div className="flex gap-2 justify-start items-center group cursor-pointer w-fit">
        <span className="group-hover:text-blue-500 group-hover:underline">
          piyushpardeshi.space
        </span>{" "}
        <TbExternalLink className="group-hover:text-blue-500" />
      </div>
    </div>
  );
};

export default LeftSection;
