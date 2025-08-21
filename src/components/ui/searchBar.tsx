import React from "react";
import { Input } from "./input";

function SearchBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <Input
        type="search"
        placeholder="Search"
        variant={"search"}
        value={search}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
