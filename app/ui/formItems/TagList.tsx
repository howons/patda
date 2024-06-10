"use client";

import { Input } from "@headlessui/react";
import { Tag } from "@lib/types/property";
import React, { InputHTMLAttributes, useState } from "react";

interface TagListProps extends InputHTMLAttributes<HTMLInputElement> {}

const TagList = React.forwardRef<HTMLInputElement, TagListProps>(
  ({ className = "", ...props }, ref) => {
    const [curTags, setCurTags] = useState<Tag[]>([]);

    return (
      <>
        <Input ref={ref} type="hidden" {...props} />
      </>
    );
  }
);

TagList.displayName = "TagList";

export default TagList;
