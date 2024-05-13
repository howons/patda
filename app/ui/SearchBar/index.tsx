import { CategoryStoreProvider } from "@lib/providers/CategoryStoreProvider";
import Category from "@ui/SearchBar/Category";
import CategoryDivider from "@ui/SearchBar/CategoryDivider";
import CategorySelector from "@ui/SearchBar/CategorySelector";
import SearchBarCore from "@ui/SearchBar/SearchBarCore";
import SearchBarWrapper from "@ui/SearchBar/SearchBarWrapper";

function SearchBar() {
  return (
    <div className="relative m-3 w-5/6 max-w-96">
      <CategoryStoreProvider>
        <CategorySelector />
        <SearchBarWrapper>
          <CategoryDivider />
          <Category />
          <SearchBarCore />
        </SearchBarWrapper>
      </CategoryStoreProvider>
    </div>
  );
}

export default SearchBar;
