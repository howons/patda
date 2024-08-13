import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import Providers from "#lib/providers/Providers.jsx";
import { SearchListProvider } from "#lib/providers/SearchListProvider.jsx";
import SearchBar from "#ui/SearchBar/SearchBar.jsx";

const meta = {
  title: "ui/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          maxWidth: "48rem",
          margin: "10% auto 10% auto",
          display: "flex",
          justifyContent: "center",
        }}>
        {Story()}
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Daangn: Story = {
  decorators: [
    (Story) => (
      <Providers>
        <SearchListProvider>{Story()}</SearchListProvider>
      </Providers>
    ),
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const selector = canvas.getByRole("group");
    const category = canvas.getByRole("button", {
      name: "검색할 카테고리 이름",
    });

    await step("다른 카테고리 버튼을 클릭시 카테고리 변경", async () => {
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

    await step(
      "현재 카테고리 이름을 클릭시 선택 가능한 카테고리 이름 표시",
      async () => {
        await userEvent.click(category);
        await waitFor(() => {
          expect(selector.childNodes[1]).toHaveClass("scale-90");
          expect(selector.childNodes[2]).toHaveClass("scale-75");
          expect(selector.childNodes[3]).toHaveClass("scale-90");
        });
      }
    );
  },
};

export const Bunjang: Story = {
  decorators: [
    (Story) => (
      <Providers platformDefaultState={{ platform: "bunjang" }}>
        <SearchListProvider>{Story()}</SearchListProvider>
      </Providers>
    ),
  ],
};

export const Joongna: Story = {
  decorators: [
    (Story) => (
      <Providers platformDefaultState={{ platform: "joongna" }}>
        <SearchListProvider>{Story()}</SearchListProvider>
      </Providers>
    ),
  ],
};

export const Etc: Story = {
  decorators: [
    (Story) => (
      <Providers platformDefaultState={{ platform: "etc" }}>
        <SearchListProvider>{Story()}</SearchListProvider>
      </Providers>
    ),
  ],
};
