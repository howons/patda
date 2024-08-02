import { fn } from "@storybook/test";

import * as actual from "./posts";

export type NewPostData = actual.NewPostData;

export const createPost = fn(actual.createPost).mockName("createPost");
export const getPost = fn(actual.getPost).mockName("getPost");
export const updatePost = fn(actual.updatePost).mockName("updatePost");
