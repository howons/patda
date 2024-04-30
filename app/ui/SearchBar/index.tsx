import Category from "@ui/SearchBar/Category";
import Divider from "@ui/SearchBar/Divider";

import { Platform } from "@/types/property";

import SearchBarCore from "./SearchBarCore";
import SearchBarWrapper from "./SearchBarWrapper";

interface SearchBarProps {
  platform: Platform;
}

function SearchBar({ platform }: SearchBarProps) {
  return (
    <SearchBarWrapper platform={platform}>
      <Category />
      <Divider />
      <SearchBarCore />
    </SearchBarWrapper>
  );
}

export default SearchBar;
