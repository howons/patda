import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import type { Session } from "next-auth";

import { auth } from "#auth.mock.js";
import { PlatformStoreProvider } from "#lib/providers/PlatformStoreProvider.jsx";
import { ProfileRefStoreProvider } from "#lib/providers/ProfileRefProvider.jsx";
import { SearchStoreProvider } from "#lib/providers/SearchStoreProvider.jsx";
import Header from "#ui/Header/Header.jsx";

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
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <PlatformStoreProvider>
        <ProfileRefStoreProvider>
          <SearchStoreProvider>{Story()}</SearchStoreProvider>
        </ProfileRefStoreProvider>
      </PlatformStoreProvider>
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
