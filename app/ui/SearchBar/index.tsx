import { CategoryStoreProvider } from "@lib/providers/CategoryStoreProvider";
import Category from "@ui/SearchBar/Category";
import CategorySelector from "@ui/SearchBar/CategorySelector";
import Divider from "@ui/SearchBar/Divider";
import SearchBarCore from "@ui/SearchBar/SearchBarCore";
import SearchBarWrapper from "@ui/SearchBar/SearchBarWrapper";

function SearchBar() {
  return (
    <div className="relative">
      <CategoryStoreProvider>
        <CategorySelector />
        <SearchBarWrapper>
          <Divider />
          <Category />
          <SearchBarCore />
        </SearchBarWrapper>
      </CategoryStoreProvider>
    </div>
  );
}

export default SearchBar;
