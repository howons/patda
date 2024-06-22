import { fn } from "@storybook/test";

import * as actual from "./db";

export const getDB = fn(actual.getDB).mockName("getDB");
export const db = actual.db;
