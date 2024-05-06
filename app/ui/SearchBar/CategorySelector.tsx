"use client";

import { TRANS_DURATION } from "@lib/constants/platform";
import { useCategoryStore } from "@lib/providers/CategoryStoreProvider";
import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { CategoryDirection, Platform } from "@lib/types/property";
import CategoryItem from "@ui/SearchBar/CategoryItem";
import { useEffect, useRef, useState } from "react";

function CategorySelector() {
  const [selectedItem, setSelectedItem] = useState(0);
  const itemList = useRef<Platform[]>(["daangn", "bunjang", "etc", "joongna"]);
  const selectorRef = useRef<HTMLDivElement | null>(null);
  const { platform, updatePlatform } = usePlatformStore((state) => state);
  const { updateDirection, isActive, toggleActive } = useCategoryStore(
    (state) => state
  );

  selectedItem === 0 && initItemList(platform, itemList.current);

  const handleItemClick = (item: Platform, idx: number) => () => {
    if (selectedItem !== 0) return;

    setSelectedItem(idx);

    const directions: CategoryDirection[] = ["up", "down", "left", "up"];
    updateDirection(directions[idx]);
    updatePlatform(item);

    isActive && toggleActive();

    setTimeout(() => {
      reorderItemList(idx, itemList.current);
      setSelectedItem(0);
    }, TRANS_DURATION);
  };

  useEffect(() => {
    const containerActiveDuration = "cs:duration-300";
    const toggleDuration = () => {
      Array.from(selectorRef.current?.children ?? []).forEach((container) => {
        container.classList.toggle(containerActiveDuration, true);
      });
    };

    toggleDuration();
    setTimeout(() => {
      toggleDuration();
    });
  }, [isActive]);

  const selectorDefaultStyle = `absolute top-1/2 transition-transform ${selectedItem % 2 ? "duration-300" : "duration-0"}`;

  const selectorStyle = ["rotate-0", "-rotate-90", "rotate-0", "rotate-90"];

  const containerDefaultStyle = `absolute origin-top-left transition-transform ${selectedItem ? "duration-300" : "duration-0"}`;

  const containerRotateStyle = [
    "-rotate-45",
    "rotate-45",
    "rotate-[135deg]",
    "-rotate-[135deg]",
  ];

  const containerScaleStyle = [
    ["", "scale-50 ", "scale-[.35] -translate-x-10 ", "scale-50 "],
    ["scale-50 ", "", "scale-50 ", "scale-[.35] "],
    ["scale-[.35] ", "scale-50 ", "translate-x-28 ", "scale-50 "],
    ["scale-50 ", "scale-[.35] ", "scale-50 ", ""],
  ];

  const containerActiveStyle = ["", "scale-90 ", "scale-75 ", "scale-90 "];

  const itemDefaultStyle = `transition-transform ${selectedItem % 2 ? "duration-300" : "duration-0"}`;

  const itemRotateStyle = [
    ["", "rotate-90 ", "", "-rotate-90 "],
    ["-rotate-90 ", "", "-rotate-90 ", "-rotate-180 "],
    ["rotate-180 ", "rotate-[270deg] ", "rotate-180 ", "rotate-90 "],
    ["rotate-90 ", "rotate-180 ", "rotate-90 ", ""],
  ];

  return (
    <div
      ref={selectorRef}
      className={`${selectorDefaultStyle} ${selectorStyle[selectedItem]}`}>
      {itemList.current.map((item, idx) => (
        <div
          key={item}
          className={`${containerDefaultStyle} ${containerRotateStyle[idx]} ${containerScaleStyle[idx][selectedItem]} ${isActive ? containerActiveStyle[idx] : ""}`}
          onClick={handleItemClick(item, idx)}>
          <CategoryItem
            platform={item}
            isActive={isActive}
            className={`${itemDefaultStyle} ${idx > 0 ? "cursor-pointer" : ""} ${itemRotateStyle[idx][selectedItem]}`}
          />
        </div>
      ))}
    </div>
  );
}

function reorderItemList(clickedItem: number, itemList: Platform[]) {
  switch (clickedItem) {
    case 1:
      itemList.push(itemList.shift()!);
      break;
    case 2:
      [itemList[0], itemList[2]] = [itemList[2], itemList[0]];
      break;
    case 3:
      itemList.unshift(itemList.pop()!);
  }
}

function initItemList(initItem: Platform, itemList: Platform[]) {
  if (itemList[0] !== initItem) {
    const itemIdx = itemList.findIndex((item) => item === initItem);
    [itemList[0], itemList[itemIdx]] = [itemList[itemIdx], itemList[0]];
  }
}

export default CategorySelector;
