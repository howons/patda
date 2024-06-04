import { CategoryStoreProvider } from "@lib/providers/CategoryStoreProvider";
import Category from "@ui/SearchBar/Category";
import CategoryDivider from "@ui/SearchBar/CategoryDivider";
import CategorySelector from "@ui/SearchBar/CategorySelector";
import SearchBarCore from "@ui/SearchBar/SearchBarCore";
import SearchBarWrapper from "@ui/SearchBar/SearchBarWrapper";
import { forwardRef, HTMLAttributes } from "react";

interface SearchBarProps extends HTMLAttributes<HTMLDivElement> {}

const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative m-3 ml-9 w-3/5 min-w-36 max-w-[37rem] ${className}`}
        {...props}>
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
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
