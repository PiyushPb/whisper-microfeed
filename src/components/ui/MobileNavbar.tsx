import Link from "next/link";
import React from "react";
import { GoHome, GoHeart, GoPerson, GoSearch } from "react-icons/go";

function MobileNavbar() {
  return (
    <div className="h-[70px] fixed bottom-0 w-full bg-white z-[1000] flex lg:hidden justify-center items-center border-t-[1px] border-border">
      <ul className="flex flex-row gap-10">
        <li>
          <Link href={"/"}>
            <GoHome size={25} />
          </Link>
        </li>
        <li>
          <Link href={"/search"}>
            <GoSearch size={25} />
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <GoHeart size={25} />
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <GoPerson size={25} />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MobileNavbar;
