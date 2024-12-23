import React from "react";

import type { FormColor } from "#lib/types/property.js";
import Input from "#ui/formItems/Input.jsx";
import { cn } from "#utils/utils.js";

interface InfoTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  colorStyle: FormColor;
}

const InfoText = React.forwardRef<HTMLInputElement, InfoTextProps>(
  ({ colorStyle, className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={cn("min-h-6 min-w-16 border-x-0 border-t-0 py-1", className)}
        {...props}
      />
    );
  }
);

InfoText.displayName = "InfoText";

export default InfoText;
