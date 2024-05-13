import { PlatformStoreProvider } from "@lib/providers/PlatformStoreProvider";
import { SearchStoreProvider } from "@lib/providers/SearchStoreProvider";
import type { Meta, StoryObj } from "@storybook/react";
import Search from "@ui/Search";

const meta = {
  title: "ui/Search",
  component: Search,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [(Story) => <SearchStoreProvider>{Story()}</SearchStoreProvider>],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DaangnSearch: Story = {
  decorators: [
    (Story) => <PlatformStoreProvider>{Story()}</PlatformStoreProvider>,
  ],
};
