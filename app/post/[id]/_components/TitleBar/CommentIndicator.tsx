import { FaRegComment } from "@react-icons/all-files/fa/FaRegComment";
import { RiScales3Line } from "@react-icons/all-files/ri/RiScales3Line";
import type { ComponentProps } from "react";

import type { PostCommentStatus } from "#lib/types/property.js";

interface CommentIndicatorProps extends ComponentProps<"div"> {
  postStatus: PostCommentStatus;
  commentCount: number;
}

export default function CommentIndicator({
  postStatus,
  commentCount,
  className = "",
  ...props
}: CommentIndicatorProps) {
  const defaultStyle =
    "flex size-11 cursor-pointer items-center justify-center";

  const statusStyle: { [key in PostCommentStatus]: string } = {
    normal: "bg-lime-200 hover:bg-lime-100",
    debate: "bg-rose-200 hover:bg-rose-100",
    deleted: "bg-lime-200 hover:bg-lime-100",
  };

  const iconStyle = "rotate-45 size-2/3 fill-stone-500/80";

  return (
    <div
      className={`${defaultStyle} ${statusStyle[postStatus]} ${className}`}
      {...props}>
      {postStatus === "normal" ? (
        <>
          <FaRegComment className={iconStyle} />
          <p className="absolute rotate-45 rounded-md text-center text-sm font-bold text-stone-800">
            {commentCount}
          </p>
        </>
      ) : (
        <RiScales3Line className={iconStyle} />
      )}
    </div>
  );
}
