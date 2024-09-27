"use client";

import { usePathname } from "next/navigation";

import PatdaLogoText from "#public/당근빳다텍스트.svg";
import { cn } from "#utils/utils.js";

function LogoText() {
  const pathname = usePathname();

  const mediaStyle = pathname === "/" ? "sm:block" : "lg:block";

  return <PatdaLogoText className={cn("hidden h-12 w-36", mediaStyle)} />;
}

export default LogoText;
