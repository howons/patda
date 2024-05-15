import Search from "@ui/Search";

function Header() {
  return (
    <div className="fixed left-0 top-0 flex h-14 w-full items-center justify-between overflow-hidden border-b border-zinc-300">
      <div>로고</div>
      <Search />
      <div>계정</div>
    </div>
  );
}

export default Header;
