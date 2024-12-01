import { FiAlertCircle } from "@react-icons/all-files/fi/FiAlertCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import { FiXCircle } from "@react-icons/all-files/fi/FiXCircle";
import { cva } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";

import { cn } from "#utils/utils.js";

const toastInvariants = cva(
  "absolute left-[5%] top-[5%] flex size-[90%] translate-y-0 flex-col items-center rounded p-2 text-sm text-white transition-transform duration-300",
  {
    variants: {
      status: {
        ERROR: "bg-red-500",
        SUCCESS: "bg-green-500",
        WARN: "bg-stone-500",
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

  if (prevKey !== toastKey) {
    setIsActive(true);
    setPrevKey(toastKey);
  }

  const timeoutRef = useRef<NodeJS.Timeout | undefined>();
  useEffect(() => {
    if (isActive) {
      timeoutRef.current = setTimeout(() => setIsActive(false), 3000);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [isActive]);

  return (
    <div
      className={cn(toastInvariants({ status }), isActive && "-translate-y-6")}>
      <StatusIcon status={status} />
      {text}
    </div>
  );
}

function StatusIcon({ status }: Pick<ElementToastProps, "status">) {
  const defaultStyle = "size-3 stroke-white";

  if (status === "ERROR") {
    return <FiXCircle className={defaultStyle} />;
  } else if (status === "SUCCESS") {
    return <FiCheckCircle className={defaultStyle} />;
  }
  return <FiAlertCircle className={defaultStyle} />;
}
