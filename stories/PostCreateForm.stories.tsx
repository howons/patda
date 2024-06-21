import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { Kysely } from "kysely";

import PostCreateForm from "#app/post/create/form";
import { FormValues } from "#lib/actions/createPostAction";
import { Database } from "#lib/database/db";
import { getDB } from "#lib/database/db.mock";
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
  async beforeEach() {
    const mockInsertBuilder = {
      insertInto: () => mockInsertBuilder,
      values: () => mockInsertBuilder,
      returning: () => mockInsertBuilder,
      executeTakeFirstOrThrow: () => mockInsertBuilder,
    };
    getDB.mockReturnValue(mockInsertBuilder as unknown as Kysely<Database>);
  },
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
    const contentTextarea = canvas.getByLabelText("상세 설명");
    const submitButton = canvas.getByRole("button", { name: "작성" });

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

    await step("초기 상태로 제출 시 클라이언트 검증", async () => {
      await userEvent.click(submitButton);
      await waitFor(() => {
        expect(contentTextarea).toHaveFocus();
        expect(getDB).not.toBeCalled();
      });
    });
  },
};
