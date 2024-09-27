import { Button as HeadlessButton } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentPropsWithRef, PropsWithChildren } from "react";

import Logo from "#public/당근빳다.svg";
import { cn } from "#utils/utils.js";

const variants = {
  colorStyle: {
    orange: "",
    red: "",
    green: "",
    zinc: "",
    rose: "",
    lime: "",
  },
  intent: {
    primary: "",
    secondary: "",
  },
};

const buttonVariants = cva(
  "relative h-12 min-w-28 overflow-hidden rounded-lg text-center text-lg font-bold",
  {
    variants,
    compoundVariants: [
      {
        colorStyle: "orange",
        intent: "primary",
        className: "bg-orange-400 text-white data-[hover]:bg-orange-300",
      },
      {
        colorStyle: "orange",
        intent: "secondary",
        className:
          "border border-orange-400 bg-orange-50 text-orange-400 data-[hover]:bg-orange-100",
      },
      {
        colorStyle: "red",
        intent: "primary",
        className: "bg-red-400 text-white data-[hover]:bg-red-300",
      },
      {
        colorStyle: "red",
        intent: "secondary",
        className:
          "border border-red-400 bg-red-50 text-red-400 data-[hover]:bg-red-100",
      },
      {
        colorStyle: "green",
        intent: "primary",
        className: "bg-green-400 text-white data-[hover]:bg-green-300",
      },
      {
        colorStyle: "green",
        intent: "secondary",
        className:
          "border border-green-400 bg-green-50 text-green-400 data-[hover]:bg-green-100",
      },
      {
        colorStyle: "zinc",
        intent: "primary",
        className: "bg-zinc-400 text-white data-[hover]:bg-zinc-300",
      },
      {
        colorStyle: "zinc",
        intent: "secondary",
        className:
          "border border-zinc-400 bg-zinc-50 text-zinc-400 data-[hover]:bg-zinc-100",
      },
      {
        colorStyle: "rose",
        intent: "primary",
        className: "bg-rose-400 text-white data-[hover]:bg-rose-300",
      },
      {
        colorStyle: "rose",
        intent: "secondary",
        className:
          "border border-rose-400 bg-rose-50 text-rose-400 data-[hover]:bg-rose-100",
      },
      {
        colorStyle: "lime",
        intent: "primary",
        className: "bg-lime-400 text-white data-[hover]:bg-lime-300",
      },
      {
        colorStyle: "lime",
        intent: "secondary",
        className:
          "border border-lime-400 bg-lime-50 text-lime-400 data-[hover]:bg-lime-100",
      },
    ],
    defaultVariants: {
      colorStyle: "orange",
      intent: "secondary",
    },
  }
);

const logoVariants = cva(
  "absolute -bottom-2 -left-4 size-8 origin-[25%_75%] -rotate-45 opacity-70",
  {
    variants,
    compoundVariants: [
      {
        colorStyle: "orange",
        intent: "primary",
        className: "fill-orange-100",
      },
      {
        colorStyle: "orange",
        intent: "secondary",
        className: "fill-orange-400",
      },
      {
        colorStyle: "red",
        intent: "primary",
        className: "fill-red-100",
      },
      {
        colorStyle: "red",
        intent: "secondary",
        className: "fill-red-400",
      },
      {
        colorStyle: "green",
        intent: "primary",
        className: "fill-green-100",
      },
      {
        colorStyle: "green",
        intent: "secondary",
        className: "fill-green-400",
      },
      {
        colorStyle: "zinc",
        intent: "primary",
        className: "fill-zinc-100",
      },
      {
        colorStyle: "zinc",
        intent: "secondary",
        className: "fill-zinc-400",
      },
      {
        colorStyle: "rose",
        intent: "primary",
        className: "fill-rose-100",
      },
      {
        colorStyle: "rose",
        intent: "secondary",
        className: "fill-rose-400",
      },
      {
        colorStyle: "lime",
        intent: "primary",
        className: "fill-lime-100",
      },
      {
        colorStyle: "lime",
        intent: "secondary",
        className: "fill-lime-400",
      },
    ],
  }
);

export interface ButtonProps
  extends ComponentPropsWithRef<"button">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export default function Button({
  colorStyle,
  intent,
  loading,
  className,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <HeadlessButton
      disabled={loading}
      className={cn(buttonVariants({ colorStyle, intent, className }))}
      {...props}>
      <Logo
        className={cn(
          logoVariants({ colorStyle, intent }),
          loading && "animate-swing-vert"
        )}
      />
      {children}
    </HeadlessButton>
  );
}
