import Banner from "@ui/Banner";
import Search from "@ui/Search";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen max-w-full flex-col items-center justify-between pb-28 pt-14">
      <Banner className="mb-8" />
      <Search className="mt-6 w-full px-4" />
    </main>
  );
}
