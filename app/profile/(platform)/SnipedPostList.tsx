"use client";

import type { Database } from "#lib/database/db.js";
import useInfiniteSearch from "#lib/hooks/useInfiniteSearch.js";
import { postDataToJSX } from "#lib/utils/post.jsx";
import Divider from "#ui/Divider/Divider.jsx";
import MoreButton from "#ui/SearchList/MoreButton.jsx";

interface SnipedPostListProps {
  profile: Omit<Database["Profile"], "userId">;
}

export default function SnipedPostList({ profile }: SnipedPostListProps) {
  const { state, size, setSize } = useInfiniteSearch({
    url: "/api/v1/posts",
    queryKeyValues: profile,
  });

  const handleMoreClick = () => {
    setSize(size + 1);
  };

  const Posts = postDataToJSX(state);

  return (
    <section>
      <Divider direction="horizon" />
      {Posts}
      <MoreButton status={state.status} onClick={handleMoreClick} />
    </section>
  );
}
