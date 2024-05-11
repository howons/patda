import { SearchStoreProvider } from "@lib/providers/SearchStoreProvider";
import SearchBar from "@ui/SearchBar";
import SearchList from "@ui/SearchList";

function Search() {
  return (
    <div>
      <SearchStoreProvider>
        <SearchBar />
        <SearchList className="mt-16" />
      </SearchStoreProvider>
    </div>
  );
}

export default Search;
