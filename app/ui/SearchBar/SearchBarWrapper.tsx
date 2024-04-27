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
    daangn: "bg-orange-400",
    bunjang: "bg-red-400",
    joongna: "bg-green-400",
    etc: "bg-zinc-400",
  };

  const defaultStyle = "border h-8";

  return (
    <div className={`${platformStyle[platform]} ${defaultStyle}`}>
      {children}
    </div>
  );
}

export default SearchBarWrapper;
