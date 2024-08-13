import type { Preview } from "@storybook/react";
import "../app/globals.css";

import { Nanum_Gothic } from "next/font/google";
import React from "react";
import { initialize, mswLoader } from "msw-storybook-addon";

initialize();

const nanumGoth = Nanum_Gothic({ weight: ["400", "700"], subsets: ["latin"] });

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },

  decorators: [
    (Story) => (
      <main className={nanumGoth.className} data-testid="screen">
        <Story />
      </main>
    ),
  ],

  tags: ["autodocs"],

  loaders: [mswLoader],
};

export default preview;
