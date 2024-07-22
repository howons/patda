import {
  Switch as HeadlessSwitch,
  SwitchProps as HeadlessSwitchProps,
} from "@headlessui/react";
import React from "react";

interface SwitchProps extends HeadlessSwitchProps {
  color: "lime";
  checkedColor: "rose";
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ color, checkedColor, className = "", ...props }, ref) => {
    const defaultStyle =
      "group inline-flex relative h-6 w-12 items-center justify-between rounded-full transition-colors overflow-hidden data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50";

    const colorStyle = {
      lime: "bg-lime-400",
    };
    const checkedColorStyle = {
      rose: "data-[checked]:bg-rose-400",
    };

    return (
      <HeadlessSwitch
        className={`${defaultStyle} ${colorStyle[color]} ${checkedColorStyle[checkedColor]} ${className}`}
        ref={ref}
        {...props}>
        <SwitchButton direction="left" />
        <SwitchButton direction="right" />
        <div className="absolute left-1 top-1.5 h-3 w-4 rounded-lg bg-white transition-transform group-data-[checked]:translate-x-6" />
        <BgGuard direction="up" color="lime" checkedColor="rose" />
        <BgGuard direction="down" color="lime" checkedColor="rose" />
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

  return <span className={`${defaultStyle} ${directionStyle[direction]}`} />;
}

interface BgGuardProps {
  direction: "up" | "down";
  color: "lime";
  checkedColor: "rose";
}

function BgGuard({ direction, color, checkedColor }: BgGuardProps) {
  const defaultStyle =
    "absolute size-5 left-3.5 transition-colors rounded-full";

  const directionStyle = {
    up: "-top-1/2",
    down: "-bottom-1/2",
  };

  const colorStyle = {
    lime: "bg-lime-400",
  };
  const checkedColorStyle = {
    rose: "group-data-[checked]:bg-rose-400",
  };

  return (
    <div
      className={`${defaultStyle} ${directionStyle[direction]} ${colorStyle[color]} ${checkedColorStyle[checkedColor]}`}
    />
  );
}
