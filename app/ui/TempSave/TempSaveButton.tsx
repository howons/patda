"use client";

import { useState } from "react";

import type { ButtonProps } from "#ui/Button/Button.jsx";
import Button from "#ui/Button/Button.jsx";
import ElementToast, {
  type ToastStatus,
} from "#ui/ElementToast/ElementToast.jsx";
import ElementToastContainer from "#ui/ElementToast/ElementToastContainer.jsx";

interface TempSaveButtonProps extends ButtonProps {
  onSaveClick: () => boolean | void;
}

export default function TempSaveButton({
  onSaveClick,
  ...props
}: TempSaveButtonProps) {
  const [saveStatus, setSaveStatus] = useState<ToastStatus>("NONE");
  const [toastKey, setToastKey] = useState(0);

  const handleSaveClick = () => {
    const isSuccess = onSaveClick();
    setSaveStatus(isSuccess ? "SUCCESS" : "ERROR");

    setToastKey(Date.now());
  };

  return (
    <ElementToastContainer>
      <ElementToast
        toastKey={toastKey}
        status={saveStatus}
        text={TOAST_TEXT[saveStatus]}
      />
      <Button onClick={handleSaveClick} {...props}>
        임시 저장
      </Button>
    </ElementToastContainer>
  );
}

var TOAST_TEXT: { [key in ToastStatus]: string } = {
  SUCCESS: "성공",
  ERROR: "오류 발생",
  WARN: "",
  NONE: "",
};
