import HeaderSearch from "@ui/Header/HeaderSearch";
import Link from "next/link";

function Header() {
  return (
    <div className="fixed left-0 top-0 flex h-14 w-full items-center justify-between border-b border-zinc-300">
      <div>로고</div>
      <div className="relative h-full grow">
        <HeaderSearch />
      </div>
      <Link href="/login">계정</Link>
    </div>
  );
}

export default Header;
