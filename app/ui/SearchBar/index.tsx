import { Platform } from "@/types/property";

import SearchBarCore from "./SearchBarCore";
import SearchBarWrapper from "./SearchBarWrapper";

interface SearchBarProps {
  platform: Platform;
}

function SearchBar({ platform }: SearchBarProps) {
  return (
    <SearchBarWrapper platform={platform}>
      <SearchBarCore />
    </SearchBarWrapper>
  );
}

export default SearchBar;
