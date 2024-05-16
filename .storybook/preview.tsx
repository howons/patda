import type { Preview } from "@storybook/react";
import "../app/globals.css";

import { Nanum_Gothic } from "next/font/google";
import React from "react";

const nanumGoth = Nanum_Gothic({ weight: ["400", "700"], subsets: ["latin"] });

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <main className={nanumGoth.className} data-testid="screen">
        <Story />
      </main>
    ),
  ],
};

export default preview;
