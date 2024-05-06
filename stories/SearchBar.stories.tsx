import { PlatformStoreProvider } from "@lib/providers/PlatformStoreProvider";
import type { Meta, StoryObj } from "@storybook/react";
import SearchBar from "@ui/SearchBar";

const meta = {
  title: "ui/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Daangn: Story = {
  decorators: [
    (Story) => <PlatformStoreProvider>{Story()}</PlatformStoreProvider>,
  ],
};

export const Bunjang: Story = {
  decorators: [
    (Story) => (
      <PlatformStoreProvider defaultState="bunjang">
        {Story()}
      </PlatformStoreProvider>
    ),
  ],
};

export const Joongna: Story = {
  decorators: [
    (Story) => (
      <PlatformStoreProvider defaultState="joongna">
        {Story()}
      </PlatformStoreProvider>
    ),
  ],
};

export const Etc: Story = {
  decorators: [
    (Story) => (
      <PlatformStoreProvider defaultState="etc">
        {Story()}
      </PlatformStoreProvider>
    ),
  ],
};
