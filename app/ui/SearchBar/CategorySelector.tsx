"use client";

import { PLATFORM_NAME, TRANS_DURATION } from "@lib/constants/platform";
import useCategoryItemList from "@lib/hooks/useCategoryItemList";
import useToggleChildrenStyle from "@lib/hooks/useToggleChildrenStyle";
import { useCategoryStore } from "@lib/providers/CategoryStoreProvider";
import CategoryItem from "@ui/SearchBar/CategoryItem";

function CategorySelector() {
  const isActive = useCategoryStore((state) => state.isActive);
  const { itemList, selectedItemIdx, handleItemClick } = useCategoryItemList();

  const { parentRef } = useToggleChildrenStyle<HTMLDivElement>(
    "cs:duration-300",
    isActive,
    TRANS_DURATION,
    true
  );

  const selectorDefaultStyle = `absolute top-1/2 transition-transform ${selectedItemIdx % 2 ? "duration-300" : "duration-0"}`;

  const selectorStyle = ["rotate-0", "-rotate-90", "rotate-0", "rotate-90"];

  const containerDefaultStyle = `absolute origin-top-left transition-transform ${selectedItemIdx ? "duration-300" : "duration-0"}`;

  const containerRotateStyle = [
    "-rotate-45",
    "rotate-45",
    "rotate-[135deg]",
    "-rotate-[135deg]",
  ];

  const containerScaleStyle = [
    ["", "scale-50", "scale-[.35] -translate-x-10", "scale-50"],
    [isActive ? "scale-90" : "scale-50", "", "scale-50", "scale-[.35]"],
    [
      isActive ? "scale-75" : "scale-[.35]",
      "scale-50",
      "translate-x-28",
      "scale-50",
    ],
    [isActive ? "scale-90" : "scale-50", "scale-[.35]", "scale-50", ""],
  ];

  const itemDefaultStyle = `transition-transform ${selectedItemIdx % 2 ? "duration-300" : "duration-0"}`;

  const itemRotateStyle = [
    ["", "rotate-90", "", "-rotate-90"],
    ["-rotate-90", "", "-rotate-90", "-rotate-180"],
    ["rotate-180", "rotate-[270deg]", "rotate-180", "rotate-90"],
    ["rotate-90", "rotate-180", "rotate-90", ""],
  ];

  return (
    <div
      ref={parentRef}
      className={`${selectorDefaultStyle} ${selectorStyle[selectedItemIdx]}`}
      role="group"
      aria-label="검색할 카테고리 로고">
      {itemList.current.map((item, idx) => (
        <button
          key={item}
          name={PLATFORM_NAME[item]}
          className={`${containerDefaultStyle} ${containerRotateStyle[idx]} ${containerScaleStyle[idx][selectedItemIdx]} ${idx === 0 ? "cursor-default" : ""}`}
          tabIndex={idx === 0 ? -1 : undefined}
          onClick={handleItemClick(item, idx)}>
          <CategoryItem
            platform={item}
            isActive={isActive}
            className={`${itemDefaultStyle} ${itemRotateStyle[idx][selectedItemIdx]}`}
          />
        </button>
      ))}
    </div>
  );
}

export default CategorySelector;
