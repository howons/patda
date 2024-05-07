import { TRANS_DURATION } from "@lib/constants/platform";
import { useCategoryStore } from "@lib/providers/CategoryStoreProvider";
import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { CategoryDirection, Platform } from "@lib/types/property";
import { useRef, useState } from "react";

function useCategoryItemList() {
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const itemList = useRef<Platform[]>(["daangn", "bunjang", "etc", "joongna"]);
  const { platform, updatePlatform } = usePlatformStore((state) => state);
  const { updateDirection, isActive, toggleActive } = useCategoryStore(
    (state) => state
  );

  initItemList(platform, itemList.current, selectedItemIdx);

  const handleItemClick = (item: Platform, idx: number) => () => {
    if (selectedItemIdx !== 0) return;

    setSelectedItemIdx(idx);

    const directions: CategoryDirection[] = ["up", "down", "left", "up"];
    updateDirection(directions[idx]);
    updatePlatform(item);

    isActive && toggleActive();

    setTimeout(() => {
      reorderItemList(idx, itemList.current);
      setSelectedItemIdx(0);
    }, TRANS_DURATION);
  };

  return { itemList, selectedItemIdx, handleItemClick };
}

function initItemList(
  initItem: Platform,
  itemList: Platform[],
  curItemIdx: number
) {
  if (curItemIdx === 0 && itemList[0] !== initItem) {
    const itemIdx = itemList.findIndex((item) => item === initItem);
    [itemList[0], itemList[itemIdx]] = [itemList[itemIdx], itemList[0]];
  }
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

export default useCategoryItemList;
