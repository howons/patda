import type { Metadata } from "next";

import { auth } from "#auth";
import Banner from "#ui/Banner/Banner.jsx";
import CreateButton from "#ui/Button/CreateButton.jsx";
import Search from "#ui/Search/Search.jsx";

export const metadata: Metadata = {
  title: {
    absolute: "당근빳다",
  },
};

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Banner className="mb-8" />
      <Search className="mt-6 w-full px-4" />
      <CreateButton isLoggedIn={!!session} classname="fixed bottom-5 right-5" />
    </>
  );
}
