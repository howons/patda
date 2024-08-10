import { HTMLAttributes } from "react";

import { SearchListProvider } from "#lib/providers/SearchListProvider.jsx";
import SearchBar from "#ui/SearchBar/SearchBar.jsx";
import SearchList from "#ui/SearchList/SearchList.jsx";

interface SearchProps extends HTMLAttributes<HTMLDivElement> {}

function Search({ className, ...props }: SearchProps) {
  return (
    <SearchListProvider>
      <div className={`flex flex-col items-center ${className}`} {...props}>
        <SearchBar className="sticky top-10 z-10" />
        <SearchList className="mt-16" />
      </div>
    </SearchListProvider>
  );
}

export default Search;
