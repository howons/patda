import {
  Switch as HeadlessSwitch,
  SwitchProps as HeadlessSwitchProps,
} from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "#utils/utils.js";

const switchVariants = cva(
  "group relative inline-flex h-6 w-12 items-center justify-between overflow-hidden rounded-full transition-colors data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  {
    variants: {
      defaultColor: {
        orange: "bg-orange-400",
        red: "bg-red-400",
        green: "bg-green-400",
        zinc: "bg-zinc-400",
        rose: "bg-rose-400",
        lime: "bg-lime-400",
      },
      checkedColor: {
        orange: "data-[checked]:bg-orange-400",
        red: "data-[checked]:bg-red-400",
        green: "data-[checked]:bg-green-400",
        zinc: "data-[checked]:bg-zinc-400",
        rose: "data-[checked]:bg-rose-400",
        lime: "data-[checked]:bg-lime-400",
      },
    },
    defaultVariants: {
      defaultColor: "lime",
      checkedColor: "rose",
    },
  }
);

interface SwitchProps
  extends HeadlessSwitchProps,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ defaultColor, checkedColor, className, ...props }, ref) => {
    return (
      <HeadlessSwitch
        className={cn(
          switchVariants({ defaultColor, checkedColor, className })
        )}
        ref={ref}
        {...props}>
        <SwitchButton direction="left" />
        <SwitchButton direction="right" />
        <div className="absolute left-1 top-1.5 h-3 w-4 rounded-lg bg-white transition-transform group-data-[checked]:translate-x-6" />
        <BgGuard
          direction="up"
          defaultColor={defaultColor}
          checkedColor={checkedColor}
        />
        <BgGuard
          direction="down"
          defaultColor={defaultColor}
          checkedColor={checkedColor}
        />
      </HeadlessSwitch>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;

interface SwitchButtonProps {
  direction: "left" | "right";
}

function SwitchButton({ direction }: SwitchButtonProps) {
  const defaultStyle = "rounded-full bg-white transition";
  const directionStyle = {
    left: "size-4 translate-x-1 group-data-[checked]:size-0 group-data-[checked]:translate-x-2",
    right:
      "size-0 -translate-x-2 group-data-[checked]:size-4 group-data-[checked]:-translate-x-1",
  };

  return <span className={cn(defaultStyle, directionStyle[direction])} />;
}

const bgGuardVariants = cva(
  "absolute left-3.5 size-5 rounded-full transition-colors",
  {
    variants: {
      defaultColor: {
        orange: "bg-orange-400",
        red: "bg-red-400",
        green: "bg-green-400",
        zinc: "bg-zinc-400",
        rose: "bg-rose-400",
        lime: "bg-lime-400",
      },
      checkedColor: {
        orange: "group-data-[checked]:bg-orange-400",
        red: "group-data-[checked]:bg-red-400",
        green: "group-data-[checked]:bg-green-400",
        zinc: "group-data-[checked]:bg-zinc-400",
        rose: "group-data-[checked]:bg-rose-400",
        lime: "group-data-[checked]:bg-lime-400",
      },
    },
    defaultVariants: {
      defaultColor: "lime",
      checkedColor: "rose",
    },
  }
);

interface BgGuardProps extends VariantProps<typeof bgGuardVariants> {
  direction: "up" | "down";
}

function BgGuard({ direction, defaultColor, checkedColor }: BgGuardProps) {
  const directionStyle = {
    up: "-top-1/2",
    down: "-bottom-1/2",
  };

  return (
    <div
      className={cn(
        bgGuardVariants({ defaultColor, checkedColor }),
        directionStyle[direction]
      )}
    />
  );
}
