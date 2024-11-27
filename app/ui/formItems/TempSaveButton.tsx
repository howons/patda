"use client";

import useTempSave from "#lib/hooks/useTempSave.js";
import type { ButtonProps } from "#ui/Button/Button.jsx";
import Button from "#ui/Button/Button.jsx";

interface TempSaveButtonProps extends ButtonProps {
  containerId: string;
  data: { [key: string]: any };
}

export default function TempSaveButton({
  containerId,
  data,
}: TempSaveButtonProps) {
  const { saveData } = useTempSave({ containerId });

  const handleSaveClick = () => {
    const isSuccess = saveData(data);
  };

  return <Button onClick={handleSaveClick}>임시 저장</Button>;
}
