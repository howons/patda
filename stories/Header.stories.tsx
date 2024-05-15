import { PlatformStoreProvider } from "@lib/providers/PlatformStoreProvider";
import { SearchStoreProvider } from "@lib/providers/SearchStoreProvider";
import type { Meta, StoryObj } from "@storybook/react";
import Header from "@ui/Header";

const meta = {
  title: "ui/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <PlatformStoreProvider>
        <SearchStoreProvider>{Story()}</SearchStoreProvider>
      </PlatformStoreProvider>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainHeader: Story = {};
