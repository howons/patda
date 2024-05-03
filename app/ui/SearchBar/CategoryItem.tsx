import { FiMoreHorizontal } from "@react-icons/all-files/fi/FiMoreHorizontal";

import DaangnLogo from "@/public/당근.svg";
import BunjangLogo from "@/public/번개장터.svg";
import JoongnaLogo from "@/public/중고나라.svg";
import { Platform } from "@/types/property";

interface CategoryItemProps {
  platform: Platform;
}

function CategoryItem({ platform }: CategoryItemProps) {
  const platformSvg: { [key in Platform]: React.JSX.Element } = {
    daangn: <DaangnLogo />,
    bunjang: <BunjangLogo />,
    joongna: <JoongnaLogo />,
    etc: <FiMoreHorizontal />,
  };

  return (
    <div className="absolute origin-top-left rotate-45">
      {platformSvg[platform]}
    </div>
  );
}

export default CategoryItem;
