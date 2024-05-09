import { PlatformStoreProvider } from "@lib/providers/PlatformStoreProvider";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const selector = canvas.getByRole("group");
    const category = canvas.getByRole("button", {
      name: "검색할 카테고리 이름",
    });

    await step("click other category buttons", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "번개장터" }));
      await waitFor(() => {
        expect(selector.childNodes[0]).toHaveAttribute("name", "번개장터");
        expect(category.childNodes[1]).toHaveTextContent("번개장터");
      });

      await userEvent.click(canvas.getByRole("button", { name: "당근" }));
      await waitFor(() => {
        expect(selector.childNodes[0]).toHaveAttribute("name", "당근");
        expect(category.childNodes[1]).toHaveTextContent("당근");
      });

      await userEvent.click(canvas.getByRole("button", { name: "기타" }));
      await waitFor(() => {
        expect(selector.childNodes[0]).toHaveAttribute("name", "기타");
        expect(category.childNodes[1]).toHaveTextContent("기타");
      });
    });
  },
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
