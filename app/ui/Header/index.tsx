import HeaderSearch from "@ui/Header/HeaderSearch";
import ProfileMenu from "@ui/Header/ProfileMenu";
import Link from "next/link";

import Logo from "@/public/당근빳다.svg";

function Header() {
  return (
    <div className="fixed left-0 top-0 flex h-14 w-screen items-center justify-between border-b border-zinc-300 bg-white px-4">
      <Link href="/">
        <Logo className="size-12" />
      </Link>
      <div className="relative h-full grow">
        <HeaderSearch />
      </div>
      <ProfileMenu />
    </div>
  );
}

export default Header;
