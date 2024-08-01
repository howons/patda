import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import PostForm from "#app/post/create/form.jsx";
import { auth } from "#auth.mock.js";
import type { FormValues } from "#lib/actions/post/createPostAction.js";
import { ERROR } from "#lib/constants/messages.js";
import { createPost } from "#lib/database/posts.mock.js";
import { PlatformStoreProvider } from "#lib/providers/PlatformStoreProvider.jsx";

const meta = {
  title: "form/PostForm",
  component: PostForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "skip-test"],
  decorators: [
    (Story) => <PlatformStoreProvider>{Story()}</PlatformStoreProvider>,
  ],
  async beforeEach() {
    const mockResult = new Promise<{ id: string }>((resolve) => {
      resolve({ id: "postId" });
    });
    createPost.mockReturnValue(mockResult);
  },
} satisfies Meta<typeof PostForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreationForm: Story = {
  tags: ["skip-test"],
  args: {},
  beforeEach: async () => {
    const mockAuth = new Promise<null>((resolve) => {
      resolve(null);
    });
    auth.mockReturnValue(mockAuth);
  },
  play: async ({ canvasElement, step }) => {
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
      };
      expect(form).toHaveFormValues(initFormValues);
    });

    await step("초기 상태로 제출 시 클라이언트 검증", async () => {
      await userEvent.click(submitButton);
      await waitFor(() => {
        expect(contentTextarea).toHaveFocus();
        expect(createPost).not.toBeCalled();
      });
    });

    await step("내용만 30자 작성 후 제출 시 서버 검증", async () => {
      await userEvent.type(
        contentTextarea,
        "1234567890abcdefghijㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊ"
      );
      await userEvent.click(submitButton);
      await waitFor(() => {
        expect(
          canvas.getByText(ERROR.POST.NO_TARGET_NICKNAME)
        ).toBeInTheDocument();
        expect(targetNicknameInput).toHaveFocus();
        expect(createPost).not.toBeCalled();
      });
    });

    await step("폼 작성 후 연결 확인", async () => {
      await userEvent.selectOptions(platformSelect, "etc");
      await userEvent.type(canvas.getByLabelText("사이트 이름"), "짭고나라");
      await userEvent.type(targetNicknameInput, "target");
      await userEvent.click(canvas.getByLabelText("안전결제 악용"));

      const sucessFormValues: FormValues = {
        platform: "etc",
        targetNickname: "target",
        tag: "abuse",
        content: "1234567890abcdefghijㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊ",
        etcPlatformName: "짭고나라",
      };
      expect(form).toHaveFormValues(sucessFormValues);

      await userEvent.click(submitButton);
      await waitFor(() => {
        expect(createPost).toBeCalled();
      });
    });
  },
};
