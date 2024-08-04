import type { PropsWithChildren } from "react";

import { PlatformStoreProvider } from "#lib/providers/PlatformStoreProvider.jsx";
import { ProfileRefStoreProvider } from "#lib/providers/ProfileRefProvider.jsx";
import { SearchStoreProvider } from "#lib/providers/SearchStoreProvider.jsx";

export default function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <PlatformStoreProvider>
      <SearchStoreProvider>
        <ProfileRefStoreProvider>{children}</ProfileRefStoreProvider>
      </SearchStoreProvider>
    </PlatformStoreProvider>
  );
}
