import Link from "next/link";

import Logo from "#public/당근빳다.svg";
import HeaderSearch from "#ui/Header/HeaderSearch";
import LogoText from "#ui/Header/LogoText";
import PostCreateButton from "#ui/Header/PostCreateButton";
import ProfileMenu from "#ui/Header/Profile/ProfileMenu";

function Header() {
  return (
    <div className="fixed left-0 top-0 flex h-14 w-screen items-center justify-between border-b border-zinc-300 bg-white px-4">
      <Link href="/" className="flex">
        <Logo className="size-12 shrink-0" />
        <LogoText />
      </Link>
      <HeaderSearch className="relative h-full min-w-0 grow" />
      <div className="flex items-center gap-4">
        <PostCreateButton />
        <ProfileMenu />
      </div>
    </div>
  );
}

export default Header;
