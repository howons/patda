import { FaRunning } from "@react-icons/all-files/fa/FaRunning";
import { FaTheaterMasks } from "@react-icons/all-files/fa/FaTheaterMasks";
import { FiMoreHorizontal } from "@react-icons/all-files/fi/FiMoreHorizontal";
import { GiBrokenPottery } from "@react-icons/all-files/gi/GiBrokenPottery";
import { GiUmbrella } from "@react-icons/all-files/gi/GiUmbrella";
import { MdMoneyOff } from "@react-icons/all-files/md/MdMoneyOff";
import { RiSafariLine } from "@react-icons/all-files/ri/RiSafariLine";
import { RiZzzLine } from "@react-icons/all-files/ri/RiZzzLine";

import type { TagId } from "#lib/types/property.js";

const tagIcons: { [key in TagId]: React.JSX.Element } = {
  abuse: <RiSafariLine />,
  cancel: <FaRunning />,
  attempt: <FaTheaterMasks />,
  noShow: <RiZzzLine />,
  lier: <GiBrokenPottery />,
  nego: <MdMoneyOff />,
  noManner: <GiUmbrella />,
  others: <FiMoreHorizontal />,
};

export default function TagItem() {
  return <div></div>;
}
