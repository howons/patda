import { Platform } from "@lib/types/property";
import { FiMoreHorizontal } from "@react-icons/all-files/fi/FiMoreHorizontal";

import DaangnLogo from "@/public/당근.svg";
import BunjangLogo from "@/public/번개장터.svg";
import JoongnaLogo from "@/public/중고나라.svg";

interface CategoryItemProps {
  platform: Platform;
  className?: string;
}

function CategoryItem({ platform, className = "" }: CategoryItemProps) {
  const svgDefaultStyle = "rotate-45 w-3/4 h-3/4";

  const platformSvg: { [key in Platform]: React.JSX.Element } = {
    daangn: <DaangnLogo className={`${svgDefaultStyle}`} />,
    bunjang: <BunjangLogo className={`${svgDefaultStyle}`} />,
    joongna: <JoongnaLogo className={`${svgDefaultStyle}`} />,
    etc: <FiMoreHorizontal className={`${svgDefaultStyle}`} />,
  };

  const platformStyle: { [key in Platform]: string } = {
    daangn: "bg-orange-100",
    bunjang: "bg-red-100",
    joongna: "bg-green-100",
    etc: "bg-zinc-100",
  };

  const defaultStyle = "w-20 h-20 flex items-center justify-center";

  return (
    <div className={`${defaultStyle} ${platformStyle[platform]} ${className}`}>
      {platformSvg[platform]}
    </div>
  );
}

export default CategoryItem;
