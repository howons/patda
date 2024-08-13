import { fn } from "@storybook/test";

import * as actual from "./posts";

export type NewPostData = actual.NewPostData;
export type UpdatePostData = actual.UpdatePostData;

export const createPost = fn(actual.createPost).mockName("createPost");
export const getPost = fn(actual.getPost).mockName("getPost");
export const getPostsByNicknamePlatform = fn(
  actual.getPostsByNicknamePlatform
).mockName("getPostsByNicknamePlatform");
export const updatePost = fn(actual.updatePost).mockName("updatePost");
export const deletePost = fn(actual.deletePost).mockName("deletePost");
