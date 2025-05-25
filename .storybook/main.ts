import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/experimental-nextjs-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-themes',
    '@storybook/addon-interactions',
  ],

  staticDirs: ['../public'],
};
export default config;
