import { PropsWithChildren } from "react";

import { Platform } from "@/types/property";

interface SearchBarWrapperProps {
  platform: Platform;
}

function SearchBarWrapper({
  platform,
  children,
}: PropsWithChildren<SearchBarWrapperProps>) {
  const platformStyle: { [key in Platform]: string } = {
    daangn: "border-orange-400",
    bunjang: "border-red-400",
    joongna: "border-green-400",
    etc: "border-zinc-400",
  };

  const defaultStyle = "border h-8 rounded-full flex items-center";

  return (
    <div className={`${platformStyle[platform]} ${defaultStyle}`}>
      {children}
    </div>
  );
}

export default SearchBarWrapper;
