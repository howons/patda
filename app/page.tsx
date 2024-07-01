import Banner from "#ui/Banner/Banner.jsx";
import CreateButton from "#ui/Button/CreateButton.jsx";
import Search from "#ui/Search/Search.jsx";

export default function Home() {
  return (
    <>
      <Banner className="mb-8" />
      <Search className="mt-6 w-full px-4" />
      <CreateButton classname="fixed bottom-5 right-5" />
    </>
  );
}
