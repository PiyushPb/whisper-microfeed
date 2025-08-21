import { GoHome, GoHeart, GoPerson, GoSearch } from "react-icons/go";

// Store icon components as references (not JSX)
export const navLinks = [
  {
    href: "/",
    icon: GoHome, // Reference to the GoHome component
  },
  {
    href: "/search",
    icon: GoSearch, // Reference to the GoSearch component
  },
  {
    href: "/liked",
    icon: GoHeart, // Reference to the GoHeart component
  },
  {
    href: "/",
    icon: GoPerson, // Reference to the GoPerson component
  },
];
