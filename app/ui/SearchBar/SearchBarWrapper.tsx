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
