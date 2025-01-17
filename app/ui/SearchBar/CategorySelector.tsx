"use client";

import { PLATFORM_NAME, TRANS_DURATION } from "#lib/constants/platform.js";
import useCategoryItemList from "#lib/hooks/useCategoryItemList.js";
import useToggleChildrenStyle from "#lib/hooks/useToggleChildrenStyle.js";
import { useCategoryStore } from "#lib/providers/CategoryStoreProvider.jsx";
import CategoryItem from "#ui/SearchBar/CategoryItem.jsx";
import { cn } from "#utils/utils.js";

export default function CategorySelector() {
  const isActive = useCategoryStore((state) => state.isActive);
  const { itemList, curItemIdx, handleItemClick } = useCategoryItemList();

  const { parentRef } = useToggleChildrenStyle<HTMLDivElement>(
    "cs:duration-300",
    isActive,
    TRANS_DURATION,
    true
  );

  const selectorDefaultStyle = `absolute top-1/2 transition-transform ${curItemIdx % 2 ? "duration-300" : "duration-0"}`;

  const selectorStyle = ["rotate-0", "-rotate-90", "rotate-0", "rotate-90"];

  const containerDefaultStyle = `absolute origin-top-left transition-transform ${curItemIdx ? "duration-300" : "duration-0"}`;

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

  const itemDefaultStyle = `transition-transform ${curItemIdx % 2 ? "duration-300" : "duration-0"}`;

  const itemRotateStyle = [
    ["", "rotate-90", "", "-rotate-90"],
    ["-rotate-90", "", "-rotate-90", "-rotate-180"],
    ["rotate-180", "rotate-[270deg]", "rotate-180", "rotate-90"],
    ["rotate-90", "rotate-180", "rotate-90", ""],
  ];

  return (
    <div
      ref={parentRef}
      className={cn(selectorDefaultStyle, selectorStyle[curItemIdx])}
      role="group"
      aria-label="검색할 카테고리 로고">
      {itemList.current.map((item, idx) => (
        <button
          key={item}
          name={PLATFORM_NAME[item]}
          className={cn(
            containerDefaultStyle,
            containerRotateStyle[idx],
            containerScaleStyle[idx][curItemIdx],
            idx === 0 && "cursor-default"
          )}
          tabIndex={idx === 0 ? -1 : undefined}
          onClick={handleItemClick(item)}>
          <CategoryItem
            platform={item}
            isActive={isActive}
            className={cn(itemDefaultStyle, itemRotateStyle[idx][curItemIdx])}
          />
        </button>
      ))}
    </div>
  );
}
