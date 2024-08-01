import { Button as HeadlessButton } from "@headlessui/react";
import { type ComponentPropsWithRef, PropsWithChildren } from "react";

import type { FormColor } from "#lib/types/property.js";
import Logo from "#public/당근빳다.svg";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  color: FormColor;
  theme?: "primary" | "sub";
  loading?: boolean;
}

function Button({
  color,
  theme = "sub",
  loading,
  className = "",
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const defaultStyle =
    "relative rounded-lg h-12 min-w-28 text-lg text-center font-bold overflow-hidden";

  const isPrimary = theme === "primary";
  const colorStyles: { [key in FormColor]: string } = {
    orange: isPrimary
      ? "bg-orange-400 data-[hover]:bg-orange-300 text-white"
      : "bg-orange-50 data-[hover]:bg-orange-100 border border-orange-400 text-orange-400",
    red: isPrimary
      ? "bg-red-400 data-[hover]:bg-red-300 text-white"
      : "bg-red-50 data-[hover]:bg-red-100 border border-red-400 text-red-400",
    green: isPrimary
      ? "bg-green-400 data-[hover]:bg-green-300 text-white"
      : "bg-green-50 data-[hover]:bg-green-100 border border-green-400 text-green-400",
    zinc: isPrimary
      ? "bg-zinc-400 data-[hover]:bg-zinc-300 text-white"
      : "bg-zinc-50 data-[hover]:bg-zinc-100 border border-zinc-400 text-zinc-400",
    lime: isPrimary
      ? "bg-lime-400 data-[hover]:bg-lime-300 text-white"
      : "bg-lime-50 data-[hover]:bg-lime-100 border border-lime-400 text-lime-400",
    rose: isPrimary
      ? "bg-rose-400 data-[hover]:bg-rose-300 text-white"
      : "bg-rose-50 data-[hover]:bg-rose-100 border border-rose-400 text-rose-400",
  };

  const logoDefaultStyle =
    "absolute -bottom-2 -left-4 size-8 origin-[25%_75%] -rotate-45 opacity-70";
  const logoColorStyles: { [key in FormColor]: string } = {
    orange: isPrimary ? "fill-orange-100" : "fill-orange-400",
    red: isPrimary ? "fill-red-100" : "fill-red-400",
    green: isPrimary ? "fill-green-100" : "fill-green-400",
    zinc: isPrimary ? "fill-zinc-100" : "fill-zinc-400",
    lime: isPrimary ? "fill-lime-100" : "fill-lime-400",
    rose: isPrimary ? "fill-rose-100" : "fill-rose-400",
  };

  return (
    <HeadlessButton
      disabled={loading}
      className={`${defaultStyle} ${colorStyles[color]} ${className}`}
      {...props}>
      <Logo
        className={`${logoDefaultStyle} ${logoColorStyles[color]} ${loading ? "animate-swing-vert" : ""}`}
      />
      {children}
    </HeadlessButton>
  );
}

export default Button;
