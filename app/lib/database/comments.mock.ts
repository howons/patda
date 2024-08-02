import { fn } from "@storybook/test";

import * as actual from "./comments";

export type NewCommentData = actual.NewCommentData;
export type UpdateCommentData = actual.UpdateCommentData;

export const createComment = fn(actual.createComment).mockName("createComment");
export const getComment = fn(actual.getComment).mockName("getComment");
export const updateComment = fn(actual.updateComment).mockName("updateComment");
export const deleteComment = fn(actual.deleteComment).mockName("deleteComment");
