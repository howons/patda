"use client";

import { FiHelpCircle } from "@react-icons/all-files/fi/FiHelpCircle";
import {
  type ComponentProps,
  MouseEventHandler,
  PropsWithChildren,
  useRef,
  useState,
} from "react";

import { cn } from "#utils/utils.js";

interface HelpCircleProps extends ComponentProps<"div"> {}

const HelpCircle = ({
  className,
  children,
  ...props
}: PropsWithChildren<HelpCircleProps>) => {
  const [showMenu, setShowMenu] = useState(false);
  const [enoughBottomSpace, setEnoughBottomSpace] = useState(true);
  const [xPosition, setXPosition] = useState<
    "LEFT" | "MID_LEFT" | "MID_RIGHT" | "RIGHT"
  >("MID_LEFT");

  const boxRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!boxRef.current) return;

    setShowMenu(true);

    const { height, width } = boxRef.current.getBoundingClientRect();
    setEnoughBottomSpace(e.clientY + height + 30 <= window.innerHeight);

    if (e.clientX < width / 4) {
      setXPosition("LEFT");
    } else if (e.clientX + width / 4 >= window.innerWidth) {
      setXPosition("RIGHT");
    } else if (e.clientX + (3 * width) / 4 >= window.innerWidth) {
      setXPosition("MID_RIGHT");
    } else {
      setXPosition("MID_LEFT");
    }
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  const boxPositionYStyle = enoughBottomSpace ? "top-7" : "bottom-7";
  const boxPositionXStyle = {
    LEFT: "-left-3",
    MID_LEFT: "-left-12",
    MID_RIGHT: "-right-12",
    RIGHT: "-right-3",
  };

  const tailPositionStyle = enoughBottomSpace
    ? "top-3 border-t-transparent border-b-neutral-100"
    : "bottom-3 border-t-neutral-100 border-b-transparent";
  const visibilityStyle = showMenu || "invisible";

  return (
    <div
      className={cn("relative font-normal text-neutral-800", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}>
      <FiHelpCircle
        size="18"
        className="text-neutral-400 hover:text-neutral-300"
      />
      <div
        className={cn(
          "absolute size-0 border-8 border-x-transparent",
          tailPositionStyle,
          visibilityStyle
        )}
      />
      <div
        ref={boxRef}
        className={cn(
          "absolute w-48 break-words rounded-md bg-neutral-100 p-3 text-sm shadow z-10",
          boxPositionYStyle,
          boxPositionXStyle[xPosition],
          visibilityStyle
        )}>
        {children}
      </div>
    </div>
  );
};

export default HelpCircle;
