import { navLinks } from "@/constants/navLinks";
import Link from "next/link";
import React from "react";

function MobileNavbar() {
  return (
    <div className="h-[70px] fixed bottom-0 w-full bg-white z-[1000] flex lg:hidden justify-center items-center border-t-[1px] border-border">
      <ul className="flex flex-row gap-10">
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>
              {/* Render the icon component */}
              <link.icon size={25} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MobileNavbar;
