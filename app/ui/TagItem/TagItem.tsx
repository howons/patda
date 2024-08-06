import { FaRunning } from "@react-icons/all-files/fa/FaRunning";
import { FaTheaterMasks } from "@react-icons/all-files/fa/FaTheaterMasks";
import { FiMoreHorizontal } from "@react-icons/all-files/fi/FiMoreHorizontal";
import { GiBrokenPottery } from "@react-icons/all-files/gi/GiBrokenPottery";
import { GiUmbrella } from "@react-icons/all-files/gi/GiUmbrella";
import { MdMoneyOff } from "@react-icons/all-files/md/MdMoneyOff";
import { RiSafe2Line } from "@react-icons/all-files/ri/RiSafe2Line";
import { RiZzzLine } from "@react-icons/all-files/ri/RiZzzLine";
import type { ComponentProps } from "react";

import type { TagId } from "#lib/types/property.js";
import type { PostInfo } from "#lib/types/response.js";

const iconStyle = "size-3/4 rotate-45 fill-neutral-600";

const TagIcons: { [key in TagId]: React.JSX.Element } = {
  abuse: <RiSafe2Line className={iconStyle} />,
  cancel: <FaRunning className={iconStyle} />,
  attempt: <FaTheaterMasks className={iconStyle} />,
  noShow: <RiZzzLine className={iconStyle} />,
  lier: <GiBrokenPottery className={iconStyle} />,
  nego: <MdMoneyOff className={iconStyle} />,
  noManner: <GiUmbrella className={iconStyle} />,
  others: <FiMoreHorizontal className={iconStyle} />,
};

interface TagItemProps extends ComponentProps<"div">, Pick<PostInfo, "tag"> {
  size?: "sm" | "md";
}

export default function TagItem({
  tag,
  size = "md",
  className = "",
  ...props
}: TagItemProps) {
  const defaultStyle =
    "flex items-center justify-center border-double border-stone-400 bg-yellow-200";

  const sizeStyle = {
    sm: "size-8 border-4",
    md: "size-14 border-[6px]",
  };

  return (
    <div
      className={`${defaultStyle} ${sizeStyle[size]} ${className}`}
      {...props}>
      {TagIcons[tag]}
    </div>
  );
}
