import React from "react";

import type { FormColor } from "#lib/types/property.js";
import Input from "#ui/formItems/Input.jsx";
import { cn } from "#utils/utils.js";

interface InfoTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  colorStyle: FormColor;
}

const InfoText = React.forwardRef<HTMLInputElement, InfoTextProps>(
  ({ colorStyle, className, ...props }, ref) => {
    const value = props.value;
    const isEmpty =
      typeof value === "undefined" ||
      (typeof value === "string" && value.length <= 0);

    return (
      <Input
        ref={ref}
        type="text"
        colorStyle={isEmpty ? "zinc" : colorStyle}
        className={cn(
          "min-h-6 min-w-16 border-x-0 border-t-0 py-1 border-opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

InfoText.displayName = "InfoText";

export default InfoText;
