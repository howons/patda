import { SearchStoreProvider } from "@lib/providers/SearchStoreProvider";
import SearchBar from "@ui/SearchBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SearchStoreProvider>
        <SearchBar />
      </SearchStoreProvider>
    </main>
  );
}
