import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import PostCreateForm from "#app/post/create/form";
import { FormValues } from "#lib/actions/createPostAction";
import { PlatformStoreProvider } from "#lib/providers/PlatformStoreProvider";

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
    const form = canvas.getByTestId("post-create-form");
    const platformSelect = canvas.getByLabelText("거래 사이트");

    await step("초기 상태", async () => {
      const initFormValues: FormValues = {
        platform: "daangn",
        targetNickname: "",
        tag: "others",
        content: "",
        anonymousUserNickname: "",
      };
      expect(form).toHaveFormValues(initFormValues);
    });
  },
};
