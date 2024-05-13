import { HTMLAttributes } from "react";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  direction: "horizon" | "vertical";
}

function Divider({ direction, ...props }: DividerProps) {
  const defaultStyle = "border-zinc-200 m-2";

  const directionStyle = {
    horizon: "border-t w-full",
    vertical: "border-l h-full",
  };

  return (
    <div
      className={`${defaultStyle} ${directionStyle[direction]}`}
      {...props}
    />
  );
}

export default Divider;
