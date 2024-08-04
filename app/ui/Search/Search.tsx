import { HTMLAttributes } from "react";

import SearchBar from "#ui/SearchBar/SearchBar.jsx";
import SearchList from "#ui/SearchList/SearchList.jsx";

interface SearchProps extends HTMLAttributes<HTMLDivElement> {}

function Search({ className, ...props }: SearchProps) {
  return (
    <div className={`flex flex-col items-center ${className}`} {...props}>
      <SearchBar />
      <SearchList className="mt-16" />
    </div>
  );
}

export default Search;
