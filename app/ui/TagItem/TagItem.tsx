import { FaRunning } from "@react-icons/all-files/fa/FaRunning";
import { FaTheaterMasks } from "@react-icons/all-files/fa/FaTheaterMasks";
import { FiMoreHorizontal } from "@react-icons/all-files/fi/FiMoreHorizontal";
import { GiBrokenPottery } from "@react-icons/all-files/gi/GiBrokenPottery";
import { GiUmbrella } from "@react-icons/all-files/gi/GiUmbrella";
import { MdMoneyOff } from "@react-icons/all-files/md/MdMoneyOff";
import { RiSafariLine } from "@react-icons/all-files/ri/RiSafariLine";
import { RiZzzLine } from "@react-icons/all-files/ri/RiZzzLine";
import type { ComponentProps } from "react";

import type { TagId } from "#lib/types/property.js";
import type { PostInfo } from "#lib/types/response.js";

const iconStyle = "size-3/4 rotate-45 fill-neutral-600";

const TagIcons: { [key in TagId]: React.JSX.Element } = {
  abuse: <RiSafariLine className={iconStyle} />,
  cancel: <FaRunning className={iconStyle} />,
  attempt: <FaTheaterMasks className={iconStyle} />,
  noShow: <RiZzzLine className={iconStyle} />,
  lier: <GiBrokenPottery className={iconStyle} />,
  nego: <MdMoneyOff className={iconStyle} />,
  noManner: <GiUmbrella className={iconStyle} />,
  others: <FiMoreHorizontal className={iconStyle} />,
};

interface TagItemProps extends ComponentProps<"div">, Pick<PostInfo, "tag"> {}

export default function TagItem({
  tag,
  className = "",
  ...props
}: TagItemProps) {
  return (
    <div
      className={`flex size-14 items-center justify-center border-[6px] border-double border-stone-400 bg-yellow-200 ${className}`}
      {...props}>
      {TagIcons[tag]}
    </div>
  );
}
