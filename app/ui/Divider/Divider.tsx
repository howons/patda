import { HTMLAttributes } from "react";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  direction: "horizon" | "vertical";
}

function Divider({ direction, ...props }: DividerProps) {
  const defaultStyle = "border-zinc-200";

  const directionStyle = {
    horizon: "border-t w-11/12 mx-auto",
    vertical: "border-l h-11/12 my-auto",
  };

  return (
    <div
      className={`${defaultStyle} ${directionStyle[direction]}`}
      {...props}
    />
  );
}

export default Divider;
