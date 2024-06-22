import type { Meta, StoryObj } from "@storybook/react";

import Banner from "#ui/Banner/Banner";

const meta = {
  title: "ui/Banner",
  component: Banner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeBanner: Story = {};
