import { HTMLAttributes } from "react";

import { SearchStoreProvider } from "#lib/providers/SearchStoreProvider.jsx";
import SearchBar from "#ui/SearchBar/SearchBar.jsx";
import SearchList from "#ui/SearchList/SearchList.jsx";

interface SearchProps extends HTMLAttributes<HTMLDivElement> {}

function Search({ className, ...props }: SearchProps) {
  return (
    <div className={`flex flex-col items-center ${className}`} {...props}>
      <SearchStoreProvider>
        <SearchBar />
        <SearchList className="mt-16" />
      </SearchStoreProvider>
    </div>
  );
}

export default Search;
