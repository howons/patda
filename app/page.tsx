import Banner from "@ui/Banner";
import CreateButton from "@ui/CreateButton/CreateButton";
import Search from "@ui/Search";

export default function Home() {
  return (
    <>
      <Banner className="mb-8" />
      <Search className="mt-6 w-full px-4" />
      <CreateButton classname="fixed bottom-5 right-5" />
    </>
  );
}
