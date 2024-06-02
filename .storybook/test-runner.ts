import type { TestRunnerConfig } from "@storybook/test-runner";

const config: TestRunnerConfig = {
  tags: {
    exclude: ["no-tests", "tokens"],
    skip: ["skip-test", "layout"],
  },
};

export default config;
