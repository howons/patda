"use client";

import { type ComponentProps, useEffect, useState } from "react";

import type { FormColor } from "#lib/types/property.js";
import Dot from "#ui/Dot/Dot.jsx";
import { cn } from "#utils/utils.js";

const HOUR_MILLISEC = 3600000;
const DAY_MILLISEC = 86400000;

interface AuthorTagProps extends ComponentProps<"section"> {
  date: Date;
  color?: FormColor;
  name?: string;
  summary?: boolean;
}

export default function AuthorTag({
  date,
  color,
  name,
  summary,
  className,
  ...props
}: AuthorTagProps) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const thisDateTime = new Date(date).getTime();
    const curDateTime = new Date().getTime();

    const timeDiff = curDateTime - thisDateTime;
    const hourDiff = Math.floor(timeDiff / HOUR_MILLISEC);
    const dayDiff = Math.floor(timeDiff / DAY_MILLISEC);

    if (hourDiff < 1) {
      setFormattedDate("방금 전");
    } else if (hourDiff < 24) {
      setFormattedDate(`${hourDiff}시간 전`);
    } else if (dayDiff < 8) {
      setFormattedDate(`${dayDiff}일 전`);
    } else if (summary) {
      setFormattedDate(`${Math.floor(timeDiff / (30 * DAY_MILLISEC))}달 전`);
    } else {
      setFormattedDate(
        new Intl.DateTimeFormat("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(date))
      );
    }
  }, [date, summary]);

  return (
    <section
      className={cn(
        "flex items-center justify-end gap-4 text-sm text-neutral-500",
        className
      )}
      {...props}>
      {name !== undefined && (
        <>
          <p>{name}</p>
          <Dot colorStyle={color} />
        </>
      )}
      <p>{formattedDate}</p>
    </section>
  );
}
