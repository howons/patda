import type { PropsWithChildren } from "react";

import { CategoryStoreProvider } from "#lib/providers/CategoryStoreProvider.jsx";
import { PlatformStoreProvider } from "#lib/providers/PlatformStoreProvider.jsx";
import { ProfileRefStoreProvider } from "#lib/providers/ProfileRefProvider.jsx";
import { SearchStoreProvider } from "#lib/providers/SearchStoreProvider.jsx";

export default function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <PlatformStoreProvider>
      <SearchStoreProvider>
        <CategoryStoreProvider>
          <ProfileRefStoreProvider>{children}</ProfileRefStoreProvider>
        </CategoryStoreProvider>
      </SearchStoreProvider>
    </PlatformStoreProvider>
  );
}
