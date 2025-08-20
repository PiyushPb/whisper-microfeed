import Link from "next/link";
import React from "react";
import { GoHome, GoHeart, GoPerson, GoSearch } from "react-icons/go";

function Navbar() {
  return (
    <div className="h-[100px] border-b-[1px] hidden lg:flex lg:fixed top-0 bg-white w-[calc(50%-1px)] justify-center items-center z-[1000]">
      {/* Navbar */}
      <ul className="flex flex-row gap-20">
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

export default Navbar;
