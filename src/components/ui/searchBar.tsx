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
    <div className="p-5 border-b-[1px] border-border">
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
