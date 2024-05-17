import Banner from "@ui/Banner";
import Search from "@ui/Search";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-28 pt-14">
      <Banner />
      <Search className="w-full" />
    </main>
  );
}
