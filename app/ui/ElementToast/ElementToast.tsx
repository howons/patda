import { FiAlertCircle } from "@react-icons/all-files/fi/FiAlertCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import { FiXCircle } from "@react-icons/all-files/fi/FiXCircle";

import { cn } from "#utils/utils.js";

interface ElementToastProps {
  status: "ERROR" | "SUCCESS" | "WARN";
  text?: string;
}

export default function ElementToast({ status, text }: ElementToastProps) {
  const defaultStyle =
    "absolute left-[5%] top-[5%] size-[90%] p-2 rounded flex flex-col items-center text-sm";

  return (
    <div className={cn(defaultStyle)}>
      <StatusIcon status={status} />
      {text}
    </div>
  );
}

function StatusIcon({ status }: Pick<ElementToastProps, "status">) {
  const defaultStyle = "size-3 fill-white";

  if (status === "ERROR") {
    return <FiXCircle className={defaultStyle} />;
  } else if (status === "SUCCESS") {
    return <FiCheckCircle className={defaultStyle} />;
  }
  return <FiAlertCircle className={defaultStyle} />;
}
