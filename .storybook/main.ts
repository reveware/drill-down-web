import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

const config: StorybookConfig = {
  "framework": {
    "name": "@storybook/experimental-nextjs-vite",
    "options": {}
  },
  "stories": [
    '../src/**/*.stories.@(tsx|mdx)',   
  ],
  addons: [
    '@storybook/addon-essentials',             // controls, docs, actions…
    '@storybook/addon-themes',                 // theme switcher
    '@storybook/addon-interactions',           // play() + testing
  ],

  "staticDirs": [
    "../public"
  ]
};
export default config;