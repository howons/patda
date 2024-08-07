import type { ComponentProps } from "react";

import type { FormColor } from "#lib/types/property.js";
import Dot from "#ui/Dot/Dot.jsx";

const HOUR_MILLISEC = 3600000;
const DAY_MILLISEC = 86400000;

interface AuthorTagProps extends ComponentProps<"section"> {
  color: FormColor;
  date: Date;
  name?: string;
  summary?: boolean;
}

export default function AuthorTag({
  color,
  date,
  name,
  summary,
  className = "",
  ...props
}: AuthorTagProps) {
  const thisDate = new Date(date);

  const thisDateTime = thisDate.getTime();
  const curDateTime = new Date().getTime();

  const timeDiff = curDateTime - thisDateTime;
  const hourDiff = Math.floor(timeDiff / HOUR_MILLISEC);
  const dayDiff = Math.floor(timeDiff / DAY_MILLISEC);

  let formattedDate = "";
  if (hourDiff < 1) {
    formattedDate = "방금 전";
  } else if (hourDiff < 24) {
    formattedDate = `${hourDiff}시간 전`;
  } else if (dayDiff < 8) {
    formattedDate = `${dayDiff}일 전`;
  } else if (summary) {
    formattedDate = `${Math.floor(timeDiff / (30 * DAY_MILLISEC))}달 전`;
  } else {
    formattedDate = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  }

  return (
    <section
      className={`flex items-center justify-end gap-4 text-sm text-neutral-500 ${className}`}
      {...props}>
      {name !== undefined && (
        <>
          <p>{name}</p>
          <Dot color={color} />
        </>
      )}
      <p>{formattedDate}</p>
    </section>
  );
}
