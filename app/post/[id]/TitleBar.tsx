import type { PostInfo } from "#lib/types/response.js";
import CategoryItem from "#ui/SearchBar/CategoryItem.jsx";

interface TitlebarProps
  extends Pick<PostInfo, "platform" | "targetNickname" | "tag"> {}

export default function TitleBar({
  platform,
  targetNickname,
  tag,
}: TitlebarProps) {
  return (
    <section className="relative">
      <CategoryItem platform={platform} className="-rotate-45" />
    </section>
  );
}
