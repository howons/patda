import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import { PlatformStoreProvider } from "#lib/providers/PlatformStoreProvider";
import { SearchStoreProvider } from "#lib/providers/SearchStoreProvider";
import Header from "#ui/Header/Header";

const meta = {
  title: "ui/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "skip-test"],
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

export const MainHeader: Story = {
  tags: ["skip-test"],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

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
        await userEvent.click(
          canvas.getByRole("button", { name: "헤더 검색바" })
        );
        await waitFor(() => {
          expect(
            canvas.queryByRole("list", { name: "검색목록" })
          ).toBeInTheDocument();
        });
      }
    });

    await step("외부 영역 클릭 시 목록 숨기기", async () => {
      {
        await userEvent.click(canvas.getByTestId("screen"));
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
        await userEvent.click(input);

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
