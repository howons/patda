import Banner from "#ui/Banner/Banner";
import CreateButton from "#ui/Button/CreateButton";
import Search from "#ui/Search/Search";

export default function Home() {
  return (
    <>
      <Banner className="mb-8" />
      <Search className="mt-6 w-full px-4" />
      <CreateButton classname="fixed bottom-5 right-5" />
    </>
  );
}
