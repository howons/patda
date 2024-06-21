import { PlatformStoreProvider } from "@lib/providers/PlatformStoreProvider";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import PostCreateForm from "@/app/post/create/form";

const meta = {
  title: "form/PostCreate",
  component: PostCreateForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => <PlatformStoreProvider>{Story()}</PlatformStoreProvider>,
  ],
} satisfies Meta<typeof PostCreateForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NonSessionForm: Story = {
  args: {
    session: null,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("처음 모두 비어있는 상태", async () => {
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
  },
};
