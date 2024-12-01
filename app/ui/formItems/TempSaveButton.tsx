"use client";

import { useState } from "react";

import useTempSave from "#lib/hooks/useTempSave.js";
import type { ButtonProps } from "#ui/Button/Button.jsx";
import Button from "#ui/Button/Button.jsx";
import ElementToast, {
  type ToastStatus,
} from "#ui/ElementToast/ElementToast.jsx";
import ElementToastContainer from "#ui/ElementToast/ElementToastContainer.jsx";

interface TempSaveButtonProps extends ButtonProps {
  containerId: string;
  data: { [key: string]: any };
}

export default function TempSaveButton({
  containerId,
  data,
}: TempSaveButtonProps) {
  const [saveStatus, setSaveStatus] = useState<ToastStatus>("NONE");
  const [toastKey, setToastKey] = useState(0);

  const { saveData } = useTempSave({ containerId });

  const handleSaveClick = () => {
    const isSuccess = saveData(data);
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
      <Button onClick={handleSaveClick}>임시 저장</Button>
    </ElementToastContainer>
  );
}

var TOAST_TEXT: { [key in ToastStatus]: string } = {
  SUCCESS: "성공",
  ERROR: "오류 발생",
  WARN: "",
  NONE: "",
};
