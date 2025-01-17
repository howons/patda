import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import type { Session } from "next-auth";

import CommentForm from "#app/post/[id]/(comment)/form.jsx";
import { auth } from "#auth.mock.js";
import type { CommentFormValues } from "#lib/actions/comment/createCommentAction.js";
import { createComment } from "#lib/database/comments.mock.js";
import { CommentStatusStoreProvider } from "#lib/providers/CommentStatusStoreProvider.jsx";

const meta = {
  title: "form/CommentForm",
  component: CommentForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <CommentStatusStoreProvider>
        <div
          style={{
            width: "100%",
            maxWidth: "48rem",
            margin: "10% auto 10% auto",
          }}>
          {Story()}
        </div>
      </CommentStatusStoreProvider>
    ),
  ],
  beforeEach() {
    const mockAuth = new Promise<Session>((resolve) => {
      resolve({ user: { id: "1" }, expires: "" });
    });
    auth.mockReturnValue(mockAuth);
  },
} satisfies Meta<typeof CommentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreationForm: Story = {
  args: { isLogin: true, postId: 1, imagePath: "" },
  beforeEach: () => {
    const mockResult = new Promise<{ id: string }>((resolve) => {
      resolve({ id: "commentId" });
    });
    createComment.mockReturnValue(mockResult);
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ delay: 30 });

    const form = canvas.getByTestId("comment-form");
    const commentStatusSwitch = canvas.getByRole("switch", {
      name: "댓글 반박 작성",
    });
    const contentTextarea = canvas.getByPlaceholderText(
      "반박 이외의 간단한 댓글을 작성해주세요."
    );
    const submitButton = canvas.getByRole("button", { name: "작성" });

    await step("초기 상태", async () => {
      const initFormValues: CommentFormValues = {
        content: "",
        images: [],
        status: "normal",
      };
      expect(form).toHaveFormValues(initFormValues);
    });

    await step("초기 상태로 제출 시 클라이언트 검증", async () => {
      await user.click(submitButton);
      await waitFor(() => {
        expect(contentTextarea).toHaveFocus();
        expect(createComment).not.toBeCalled();
      });
    });

    await step("폼 작성 후 연결 확인", async () => {
      await user.click(commentStatusSwitch);
      await user.type(contentTextarea, "content");

      const sucessFormValues = {
        status:
          true /**@bug 알 수 없는 이유로 스토리북에서만 value 값 적용 안됨 **/,
        content: "content",
      };
      expect(form).toHaveFormValues(sucessFormValues);

      await user.click(submitButton);
      await waitFor(() => {
        expect(createComment).toBeCalled();
      });
    });
  },
};
