import { fn } from "@storybook/test";

import * as actual from "./posts";

export type NewPostData = actual.NewPostData;
export const createPost = fn(actual.createPost).mockName("createPost");
