"use client";

import { TRANS_DURATION } from "@lib/constants/platform";
import useCategoryItemList from "@lib/hooks/useCategoryItemList";
import { useCategoryStore } from "@lib/providers/CategoryStoreProvider";
import CategoryItem from "@ui/SearchBar/CategoryItem";
import { useEffect, useRef } from "react";

function CategorySelector() {
  const selectorRef = useRef<HTMLDivElement | null>(null);
  const isActive = useCategoryStore((state) => state.isActive);
  const { itemList, selectedItemIdx, handleItemClick } = useCategoryItemList();

  useEffect(() => {
    const containerActiveDuration = "cs:duration-300";
    const toggleDuration = (force?: boolean) => {
      Array.from(selectorRef.current?.children ?? []).forEach((container) => {
        container.classList.toggle(containerActiveDuration, force);
      });
    };

    toggleDuration(true);
    setTimeout(() => {
      toggleDuration(false);
    }, TRANS_DURATION);
  }, [isActive]);

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
      ref={selectorRef}
      className={`${selectorDefaultStyle} ${selectorStyle[selectedItemIdx]}`}>
      {itemList.current.map((item, idx) => (
        <div
          key={item}
          className={`${containerDefaultStyle} ${containerRotateStyle[idx]} ${containerScaleStyle[idx][selectedItemIdx]}`}
          onClick={handleItemClick(item, idx)}>
          <CategoryItem
            platform={item}
            isActive={isActive}
            className={`${itemDefaultStyle} ${idx > 0 ? "cursor-pointer" : ""} ${itemRotateStyle[idx][selectedItemIdx]}`}
          />
        </div>
      ))}
    </div>
  );
}

export default CategorySelector;
