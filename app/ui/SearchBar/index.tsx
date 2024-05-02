import Category from "@ui/SearchBar/Category";
import Divider from "@ui/SearchBar/Divider";

import SearchBarCore from "./SearchBarCore";
import SearchBarWrapper from "./SearchBarWrapper";

function SearchBar() {
  return (
    <SearchBarWrapper>
      <Category />
      <Divider />
      <SearchBarCore />
    </SearchBarWrapper>
  );
}

export default SearchBar;
