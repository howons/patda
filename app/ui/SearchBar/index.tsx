import Category from "@ui/SearchBar/Category";
import CategorySelector from "@ui/SearchBar/CategorySelector";
import Divider from "@ui/SearchBar/Divider";

import SearchBarCore from "./SearchBarCore";
import SearchBarWrapper from "./SearchBarWrapper";

function SearchBar() {
  return (
    <div className="relative">
      <CategorySelector />
      <SearchBarWrapper>
        <Divider />
        <Category />
        <SearchBarCore />
      </SearchBarWrapper>
    </div>
  );
}

export default SearchBar;
