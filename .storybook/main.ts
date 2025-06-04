import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../STORIES/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-docs" // Added addon-docs for MDX support
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  "viteFinal": async (config) => {
    return mergeConfig(config, {
      optimizeDeps: {
        include: ["@storybook/mdx2-csf"] // Ensure MDX dependencies are optimized
      }
    });
  }
};

export default config;