import { FiAlertCircle } from "@react-icons/all-files/fi/FiAlertCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import { FiXCircle } from "@react-icons/all-files/fi/FiXCircle";
import { cva } from "class-variance-authority";
import { useState } from "react";

import useDuplTimeout from "#lib/hooks/useDuplActiveTimeout.js";
import { cn } from "#utils/utils.js";

const toastInvariants = cva(
  "absolute left-[5%] top-[5%] size-[90%] translate-y-0 rounded p-2 text-xs text-white transition-transform duration-300",
  {
    variants: {
      status: {
        ERROR: "bg-red-400",
        SUCCESS: "bg-green-500",
        WARN: "bg-stone-400",
        NONE: "",
      },
    },
  }
);

export type ToastStatus = "ERROR" | "SUCCESS" | "WARN" | "NONE";

interface ElementToastProps {
  toastKey: string | number;
  status: ToastStatus;
  text?: string;
}

export default function ElementToast({
  toastKey,
  status,
  text,
}: ElementToastProps) {
  const [prevKey, setPrevKey] = useState<string | number>(0);
  const [isActive, setIsActive] = useState(false);
  const [isDuplActive, setIsDuplActive] = useState(false);

  if (prevKey !== toastKey) {
    if (isActive) {
      setIsDuplActive(true);
    }

    setIsActive(true);

    setPrevKey(toastKey);
  }

  useDuplTimeout(isActive, setIsActive, isDuplActive, setIsDuplActive);

  return (
    <div
      className={cn(
        toastInvariants({ status }),
        isActive && "-translate-y-8",
        isDuplActive && "-translate-y-3 duration-100"
      )}>
      <p className="flex flex-row items-center">
        <StatusIcon status={status} />
        {text}
      </p>
    </div>
  );
}

function StatusIcon({ status }: Pick<ElementToastProps, "status">) {
  const defaultStyle = "size-3 stroke-white mr-1";

  if (status === "ERROR") {
    return <FiXCircle className={defaultStyle} />;
  } else if (status === "SUCCESS") {
    return <FiCheckCircle className={defaultStyle} />;
  }
  return <FiAlertCircle className={defaultStyle} />;
}
