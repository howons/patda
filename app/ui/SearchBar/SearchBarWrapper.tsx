import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { PropsWithChildren } from "react";

import { Platform } from "@/types/property";

function SearchBarWrapper({ children }: PropsWithChildren) {
  const platform = usePlatformStore((state) => state.platform);

  const platformStyle: { [key in Platform]: string } = {
    daangn: "border-orange-500",
    bunjang: "border-red-500",
    joongna: "border-green-500",
    etc: "border-zinc-500",
  };

  const defaultStyle = "border h-8 rounded-full flex items-center shadow-md";

  return (
    <div className={`${platformStyle[platform]} ${defaultStyle}`}>
      {children}
    </div>
  );
}

export default SearchBarWrapper;
