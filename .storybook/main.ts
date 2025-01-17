import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  docs: {},

  staticDirs: ["../public"],

  webpackFinal: async (config) => {
    const imageRule = config.module?.rules?.find((rule) => {
      const test = (rule as { test: RegExp }).test;

      if (!test) {
        return false;
      }

      return test.test(".svg");
    }) as { [key: string]: any };

    imageRule.exclude = /\.svg$/;

    if (config.module?.rules) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
    }

    if (config.resolve) {
      config.resolve.extensionAlias = {
        ".js": [".ts", ".js"],
        ".jsx": [".tsx", ".jsx"],
      };
    }

    return config;
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },

  features: {
    experimentalRSC: true,
  },
};
export default config;
