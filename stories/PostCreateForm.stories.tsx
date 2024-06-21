import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { Kysely } from "kysely";

import PostCreateForm from "#app/post/create/form";
import { auth } from "#auth.mock";
import { FormValues } from "#lib/actions/createPostAction";
import { ERROR } from "#lib/constants/messages";
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
  async beforeEach() {
    const mockAuth = () =>
      new Promise((resolve) => {
        resolve(null);
      });
    auth.mockReturnValue(mockAuth as () => Promise<Response>);
  },
  async play({ canvasElement, step }) {
    const canvas = within(canvasElement);
    const form = canvas.getByTestId("post-create-form");
    const platformSelect = canvas.getByLabelText("거래 사이트");
    const targetNicknameInput = canvas.getByLabelText("상대 닉네임");
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

    await step("내용만 30자 작성 후 제출 시 서버 검증", async () => {
      await userEvent.type(
        contentTextarea,
        "1234567890abcdefghijㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊ"
      );
      await userEvent.click(submitButton);
      await waitFor(() => {
        expect(canvas.getByText(ERROR.NO_TARGET_NICKNAME)).toBeInTheDocument();
        expect(targetNicknameInput).toHaveFocus();
        expect(getDB).not.toBeCalled();
      });
    });
  },
};
