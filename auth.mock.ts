import { fn } from "@storybook/test";
import type { Session } from "next-auth";

import * as actual from "./auth";

export const auth = fn(actual.auth as () => Promise<Session | null>).mockName(
  "auth"
);
