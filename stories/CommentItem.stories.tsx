import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import type { Session } from "next-auth";

import CommentItem from "#app/post/[id]/(comment)/_component/CommentItem/CommentItem.jsx";
import { auth } from "#auth.mock.js";
import {
  deleteComment,
  getComment,
  updateComment,
} from "#lib/database/comments.mock.js";
import { CommentStatusStoreProvider } from "#lib/providers/CommentStatusStoreProvider.jsx";
import type { CommentInfo } from "#lib/types/response.js";

const meta = {
  title: "ui/CommentItem",
  component: CommentItem,
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
  async beforeEach() {
    const mockAuth = new Promise<Session>((resolve) => {
      resolve({ user: { id: "1" }, expires: "" });
    });
    auth.mockReturnValue(mockAuth);
  },
} satisfies Meta<typeof CommentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const dummyComment: CommentInfo = {
  id: "1",
  userId: "1",
  userName: "user123",
  /** content.length >= 3000  */
  content:
    "Amidst the azure twilight, a curious squirrel serenaded the moon with a harmonica made of stardust. The celestial melody echoed through the ancient forest, captivating the fireflies and enchanting the leaves. Each note carried a secret whispered by the constellations, and the squirrel’s tiny paws danced across the silvered branches as if conducting a cosmic symphony. The moon, a silent audience, bathed the scene in its silvery glow, casting elongated shadows that swayed to the rhythm. And so, under the watchful eyes of the night, the squirrel played on, bridging the realms of earth and sky with its celestial music.\
    Amidst the azure twilight, a curious squirrel serenaded the moon with a harmonica made of stardust. The celestial melody echoed through the ancient forest, captivating the fireflies and enchanting the leaves. Each note carried a secret whispered by the constellations, and the squirrel’s tiny paws danced across the silvered branches as if conducting a cosmic symphony. The moon, a silent audience, bathed the scene in its silvery glow, casting elongated shadows that swayed to the rhythm. And so, under the watchful eyes of the night, the squirrel played on, bridging the realms of earth and sky with its celestial music.\
    Amidst the azure twilight, a curious squirrel serenaded the moon with a harmonica made of stardust. The celestial melody echoed through the ancient forest, captivating the fireflies and enchanting the leaves. Each note carried a secret whispered by the constellations, and the squirrel’s tiny paws danced across the silvered branches as if conducting a cosmic symphony. The moon, a silent audience, bathed the scene in its silvery glow, casting elongated shadows that swayed to the rhythm. And so, under the watchful eyes of the night, the squirrel played on, bridging the realms of earth and sky with its celestial music.",
  images: [],
  status: "normal",
  createdAt: new Date("2024-08-01T09:24:00"),
  updatedAt: new Date("2024-08-01T09:24:00"),
};

export const Comment: Story = {
  args: {
    comment: dummyComment,
    isMine: true,
    isLast: true,
  },
  beforeEach: async () => {
    const mockGetResult = new Promise<CommentInfo>((resolve) => {
      resolve(dummyComment);
    });
    getComment.mockReturnValue(mockGetResult);

    const mockUpdateResult = new Promise<{ numUpdatedRows: bigint }>(
      (resolve) => {
        resolve({ numUpdatedRows: BigInt(1) });
      }
    );
    updateComment.mockReturnValue(mockUpdateResult);

    const mockDeleteResult = new Promise<{ numDeletedRows: bigint }>(
      (resolve) => {
        resolve({ numDeletedRows: BigInt(1) });
      }
    );
    deleteComment.mockReturnValue(mockDeleteResult);
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ delay: 300 });
    const moreButton = await canvas.findByRole("button", { name: "" });
    const contentContainer = moreButton.parentElement;

    await step("더보기 버튼 클릭", async () => {
      expect(contentContainer).toHaveClass("max-h-[25rem]");

      await user.click(moreButton);
      expect(contentContainer).toHaveClass("max-h-[50rem]");

      await user.click(moreButton);
      expect(contentContainer).toHaveClass("max-h-[25rem]");
    });

    await step("수정 버튼 클릭", async () => {
      await user.click(moreButton);

      await user.click(canvas.getByRole("button", { name: "수정" }));
      await waitFor(() => {
        expect(contentContainer).toHaveClass("max-h-60");
      });
      await waitFor(() => {
        expect(contentContainer).toHaveClass("max-h-[50rem]");
      });

      expect(moreButton).toHaveClass("hidden");
    });

    await step("수정 폼 제출", async () => {
      await user.click(canvas.getByRole("button", { name: "작성" }));

      await waitFor(() => {
        expect(updateComment).toBeCalled();
      });
    });

    await step("삭제 버튼 클릭", async () => {
      await user.click(canvas.getByRole("button", { name: "삭제" }));
      await user.click(canvas.getByRole("button", { name: "삭제 승인" }));

      await waitFor(() => {
        expect(deleteComment).toBeCalled();
      });
    });
  },
};
