import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { delay, http, HttpResponse } from "msw";

import Providers from "#lib/providers/Providers.jsx";
import type {
  InfinitePostsInfo,
  TroublemakerInfo,
} from "#lib/types/response.js";
import Search from "#ui/Search/Search.jsx";

let idx = 0;
const itemList: TroublemakerInfo[] = Array.from(
  { length: 145 },
  (_, i) => 145 - i
).map((id) => ({
  id,
  additionalInfo: "add",
  commentCount: 7,
  createdAt: new Date("2024-08-08T20:20:20"),
  updatedAt: new Date("2024-08-08T20:20:20"),
  platform: "daangn",
  status: "normal",
  tag: "abuse",
  targetNickname: "target",
  etcPlatformName: null,
}));

const meta = {
  title: "ui/Search",
  component: Search,
  parameters: {
    layout: "padded",
    msw: {
      handlers: [
        http.get(`/api/v1/posts`, async () => {
          await delay(800);
          const data = itemList.slice(idx, idx + 10);
          const info: InfinitePostsInfo = {
            data,
            nextCursor: data.at(-1)?.id ?? 0,
          };

          idx += 10;
          return HttpResponse.json(info);
        }),
      ],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          maxWidth: "48rem",
          margin: "10% auto 10% auto",
        }}>
        {Story()}
      </div>
    ),
  ],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Daangn: Story = {
  decorators: [(Story) => <Providers>{Story()}</Providers>],
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
        {Story()}
      </Providers>
    ),
  ],
};

export const Joongna: Story = {
  decorators: [
    (Story) => (
      <Providers platformDefaultState={{ platform: "joongna" }}>
        {Story()}
      </Providers>
    ),
  ],
};

export const Etc: Story = {
  decorators: [
    (Story) => (
      <Providers platformDefaultState={{ platform: "etc" }}>
        {Story()}
      </Providers>
    ),
  ],
};
