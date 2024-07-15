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

const TagIcons: { [key in TagId]: React.JSX.Element } = {
  abuse: <RiSafariLine />,
  cancel: <FaRunning />,
  attempt: <FaTheaterMasks />,
  noShow: <RiZzzLine />,
  lier: <GiBrokenPottery />,
  nego: <MdMoneyOff />,
  noManner: <GiUmbrella />,
  others: <FiMoreHorizontal />,
};

interface TagItemProps extends ComponentProps<"div">, Pick<PostInfo, "tag"> {}

export default function TagItem({
  tag,
  className = "",
  ...props
}: TagItemProps) {
  return (
    <div className={`-rotate-45 ${className}`} {...props}>
      {TagIcons[tag]}
    </div>
  );
}
