import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';
import { withThemeByClassName } from '@storybook/addon-themes';
import { QueryProvider } from '../src/providers/query-provider';

const parameters = {
  layout: 'padded',
  controls: { expanded: true },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#1c1b22' },
    ],
  },
};

export const decorators = [
  (Story) => (
    <QueryProvider>
      <Story />
    </QueryProvider>
  ),
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

export const preview: Preview = {
  parameters,
  decorators,
};
