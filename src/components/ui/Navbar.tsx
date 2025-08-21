import { navLinks } from "@/constants/navLinks";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="h-[100px] border-b-[1px] hidden lg:flex lg:fixed top-0 bg-white w-[calc(50%-1px)] justify-center items-center z-[1000]">
      {/* Navbar */}
      <ul className="flex flex-row gap-20">
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>
              <link.icon size={25} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
