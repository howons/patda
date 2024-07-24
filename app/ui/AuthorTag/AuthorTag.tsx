import type { ComponentProps } from "react";

import type { FormColor } from "#lib/types/property.js";
import Dot from "#ui/Dot/Dot.jsx";

interface AuthorTagProps extends ComponentProps<"section"> {
  name: string;
  color: FormColor;
  date: Date;
}

export default function AuthorTag({
  name,
  color,
  date,
  className = "",
  ...props
}: AuthorTagProps) {
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    <section
      className={`flex items-center justify-end gap-4 text-sm text-neutral-500 ${className}`}
      {...props}>
      <p>{name}</p>
      <Dot color={color} />
      <p>{formattedDate}</p>
    </section>
  );
}
