import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
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
  args: {
    platform: "daangn",
  },
};

export const Bunjang: Story = {
  args: {
    platform: "bunjang",
  },
};

export const Joongna: Story = {
  args: {
    platform: "joongna",
  },
};

export const Etc: Story = {
  args: {
    platform: "etc",
  },
};
