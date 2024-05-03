"use client";

import CategoryItem from "@ui/SearchBar/CategoryItem";

function CategorySelector() {
  return (
    <div className="absolute top-1/2 h-1/2">
      <CategoryItem platform="daangn" />
      <CategoryItem platform="bunjang" />
      <CategoryItem platform="joongna" />
      <CategoryItem platform="etc" />
    </div>
  );
}

export default CategorySelector;
