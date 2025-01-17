import { forwardRef, HTMLAttributes } from "react";

import Category from "#ui/SearchBar/Category.jsx";
import CategoryDivider from "#ui/SearchBar/CategoryDivider.jsx";
import CategorySelector from "#ui/SearchBar/CategorySelector.jsx";
import SearchBarCore from "#ui/SearchBar/SearchBarCore.jsx";
import SearchBarWrapper from "#ui/SearchBar/SearchBarWrapper.jsx";
import { cn } from "#utils/utils.js";

interface SearchBarProps extends HTMLAttributes<HTMLDivElement> {}

const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative m-3 ml-9 w-4/5 min-w-36 max-w-md sm:w-3/5",
          className
        )}
        {...props}>
        <CategorySelector />
        <SearchBarWrapper>
          <CategoryDivider />
          <Category />
          <SearchBarCore />
        </SearchBarWrapper>
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
