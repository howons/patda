import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { delay, http, HttpResponse } from "msw";
import type { Session } from "next-auth";

import { auth } from "#auth.mock.js";
import Providers from "#lib/providers/Providers.jsx";
import { SearchListProvider } from "#lib/providers/SearchListProvider.jsx";
import type {
  InfinitePostsInfo,
  TroublemakerInfo,
} from "#lib/types/response.js";
import Header from "#ui/Header/Header.jsx";

let idx = 0;
const itemList: TroublemakerInfo[] = Array.from(
  { length: 45 },
  (_, i) => 45 - i
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
  title: "ui/Header",
  component: Header,
  parameters: {
    layout: "centered",
    nextjs: {
      navigation: {
        pathname: "/not-homepage",
      },
    },
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
      <Providers>
        <SearchListProvider>{Story()}</SearchListProvider>
      </Providers>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NonSessionHeader: Story = {
  beforeEach: async () => {
    const mockAuth: Promise<Session | null> = new Promise((resolve) => {
      resolve(null);
    });
    auth.mockReturnValue(mockAuth);
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ delay: 300 });

    await step("처음에는 목록 숨겨진 상태", async () => {
      {
        await waitFor(() => {
          expect(
            canvas.getByRole("button", { name: "헤더 검색바" })
          ).toBeInTheDocument();
        });
        expect(
          canvas.queryByRole("list", { name: "검색목록" })
        ).not.toBeInTheDocument();
      }
    });

    await step("헤더 검색바 클릭 시 목록 노출", async () => {
      {
        await user.click(canvas.getByRole("button", { name: "헤더 검색바" }));
        await waitFor(() => {
          expect(
            canvas.queryByRole("list", { name: "검색목록" })
          ).toBeInTheDocument();
        });
      }
    });

    await step("외부 영역 클릭 시 목록 숨기기", async () => {
      {
        await user.click(canvas.getByTestId("screen"));
        await waitFor(
          () => {
            expect(
              canvas.queryByRole("list", { name: "검색목록" })
            ).not.toBeInTheDocument();
          },
          { timeout: 200 }
        );
      }
    });

    await step("헤더 검색바 인풋 클릭 시 포커스 & 목룍 노출", async () => {
      {
        const input = canvas.getByRole("textbox", { name: "검색바" });
        await user.click(input);

        expect(input).toHaveFocus();

        await waitFor(() => {
          expect(
            canvas.queryByRole("list", { name: "검색목록" })
          ).toBeInTheDocument();
        });
      }
    });
  },
};
