import type { PropsWithChildren } from "react";

import { CategoryStoreProvider } from "#lib/providers/CategoryStoreProvider.jsx";
import { PlatformStoreProvider } from "#lib/providers/PlatformStoreProvider.jsx";
import { ProfileRefProvider } from "#lib/providers/ProfileRefProvider.jsx";
import { SearchStoreProvider } from "#lib/providers/SearchStoreProvider.jsx";
import type { PlatformState } from "#lib/stores/platformStore.js";
import type { SearchState } from "#lib/stores/searchStore.js";

interface ProvidersProps {
  platformDefaultState?: PlatformState;
  searchDefaultState?: SearchState;
}

export default function Providers({
  platformDefaultState,
  searchDefaultState,
  children,
}: PropsWithChildren<ProvidersProps>) {
  return (
    <PlatformStoreProvider defaultState={platformDefaultState?.platform}>
      <SearchStoreProvider defaultState={searchDefaultState?.query}>
        <CategoryStoreProvider>
          <ProfileRefProvider>{children}</ProfileRefProvider>
        </CategoryStoreProvider>
      </SearchStoreProvider>
    </PlatformStoreProvider>
  );
}
