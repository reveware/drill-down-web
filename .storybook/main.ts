import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: ['@storybook/addon-themes', '@storybook/addon-docs', '@storybook/addon-vitest'],

  staticDirs: ['../public'],
};
export default config;
