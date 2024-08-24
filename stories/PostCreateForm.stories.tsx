import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import type { Session } from "next-auth";

import PostForm from "#app/post/create/form.jsx";
import { auth } from "#auth.mock.js";
import type { FormValues } from "#lib/actions/post/createPostAction.js";
import type { PostUpdateFormValues } from "#lib/actions/post/updatePostAction.js";
import { ERROR } from "#lib/constants/messages.js";
import { createPost, getPost, updatePost } from "#lib/database/posts.mock.js";
import { PlatformStoreProvider } from "#lib/providers/PlatformStoreProvider.jsx";
import type { PostInfo } from "#lib/types/response.js";

const meta = {
  title: "form/PostForm",
  component: PostForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <PlatformStoreProvider>
        <div
          style={{
            width: "100%",
            maxWidth: "48rem",
            margin: "10% auto 10% auto",
          }}>
          {Story()}
        </div>
      </PlatformStoreProvider>
    ),
  ],
  async beforeEach() {
    const mockAuth = new Promise<Session>((resolve) => {
      resolve({ user: { id: "1", name: "n" }, expires: "" });
    });
    auth.mockReturnValue(mockAuth);
  },
} satisfies Meta<typeof PostForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreationForm: Story = {
  args: {
    imagePath: "test",
  },
  beforeEach: async () => {
    const mockResult = new Promise<{ id: number }>((resolve) => {
      resolve({ id: 1 });
    });
    createPost.mockReturnValue(mockResult);
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ delay: 30 });

    const form = canvas.getByTestId("post-form");
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
        images: [],
      };
      expect(form).toHaveFormValues(initFormValues);
    });

    await step("초기 상태로 제출 시 클라이언트 검증", async () => {
      await user.click(submitButton);
      await waitFor(() => {
        expect(contentTextarea).toHaveFocus();
        expect(createPost).not.toBeCalled();
      });
    });

    await step("내용만 30자 작성 후 제출 시 서버 검증", async () => {
      await user.type(
        contentTextarea,
        "1234567890abcdefghijㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊ"
      );
      await user.click(submitButton);
      await waitFor(() => {
        expect(
          canvas.getByText(ERROR.POST.NO_TARGET_NICKNAME)
        ).toBeInTheDocument();
        expect(targetNicknameInput).toHaveFocus();
        expect(createPost).not.toBeCalled();
      });
    });

    await step("폼 작성 후 연결 확인", async () => {
      await user.selectOptions(platformSelect, "etc");
      await user.type(canvas.getByLabelText("사이트 이름"), "짭고나라");
      await user.type(targetNicknameInput, "target");
      await user.click(canvas.getByLabelText("안전결제 악용"));

      const sucessFormValues: FormValues = {
        platform: "etc",
        targetNickname: "target",
        tag: "abuse",
        content: "1234567890abcdefghijㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊ",
        etcPlatformName: "짭고나라",
        images: [],
      };
      expect(form).toHaveFormValues(sucessFormValues);

      await user.click(submitButton);
      await waitFor(() => {
        expect(createPost).toBeCalled();
      });
    });
  },
};

export const UpdateForm: Story = {
  args: {
    id: 1,
    content: "1234567890abcdefghijㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊ",
    etcPlatformName: null,
    images: [],
    platform: "bunjang",
    tag: "cancel",
    targetNickname: "bull",
    imagePath: "post/0",
  },
  beforeEach: async () => {
    const mockUpdateResult = new Promise<{ numUpdatedRows: bigint }>(
      (resolve) => {
        resolve({ numUpdatedRows: BigInt(1) });
      }
    );
    updatePost.mockReturnValue(mockUpdateResult);

    const mockGetResult = new Promise<PostInfo>((resolve) => {
      resolve({
        id: 1,
        userId: "1",
        content: "1234567890abcdefghijㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊ",
        etcPlatformName: null,
        images: [],
        platform: "bunjang",
        tag: "cancel",
        targetNickname: "bull",
        createdAt: new Date("2024-08-01T09:24:00"),
        updatedAt: new Date("2024-08-01T09:24:00"),
        status: "normal",
        additionalInfo: "add",
        commentCount: 5,
      });
    });
    getPost.mockReturnValue(mockGetResult);
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ delay: 30 });

    const form = canvas.getByTestId("post-form");
    const submitButton = canvas.getByRole("button", { name: "작성" });

    await step("초기 상태", async () => {
      const initFormValues: PostUpdateFormValues = {
        content: "1234567890abcdefghijㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊ",
        platform: "bunjang",
        tag: "cancel",
        targetNickname: "bull",
        images: [],
      };
      expect(form).toHaveFormValues(initFormValues);
    });

    await step("초기 상태로 제출 가능", async () => {
      await user.click(submitButton);
      await waitFor(() => {
        expect(updatePost).toBeCalled();
      });
    });
  },
};
