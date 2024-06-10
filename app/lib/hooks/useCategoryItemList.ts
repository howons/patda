import { TRANS_DURATION } from "@lib/constants/platform";
import { useCategoryStore } from "@lib/providers/CategoryStoreProvider";
import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { CategoryDirection, Platform } from "@lib/types/property";
import { useEffect, useRef, useState } from "react";

const directions: CategoryDirection[] = ["up", "down", "left", "up"];

function useCategoryItemList() {
  const [curItemIdx, setCurItemIdx] = useState(0);
  const itemList = useRef<Platform[]>(["daangn", "bunjang", "etc", "joongna"]);
  const { platform, updatePlatform } = usePlatformStore((state) => state);
  const { updateDirection, isActive, toggleActive } = useCategoryStore(
    (state) => state
  );

  const handleItemClick = (item: Platform) => () => {
    updatePlatform(item);
  };

  useEffect(() => {
    if (curItemIdx !== 0 || itemList.current[0] === platform) return;

    const itemIdx = itemList.current.findIndex((item) => item === platform);

    setCurItemIdx(itemIdx);
    updateDirection(directions[itemIdx]);
    isActive && toggleActive();

    setTimeout(() => {
      reorderItemList(itemIdx, itemList.current);
      setCurItemIdx(0);
    }, TRANS_DURATION);
  }, [isActive, platform, curItemIdx, toggleActive, updateDirection]);

  return { itemList, curItemIdx, handleItemClick };
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
