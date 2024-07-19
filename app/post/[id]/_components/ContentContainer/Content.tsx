import type { ComponentProps } from "react";

import type { PostInfo } from "#lib/types/response.js";

interface ContentProps extends ComponentProps<"section"> {
  content: PostInfo["content"];
}

export default function Content({
  content,
  className = "",
  ...props
}: ContentProps) {
  return (
    <section className={`${className}`} {...props}>
      {content}
    </section>
  );
}
