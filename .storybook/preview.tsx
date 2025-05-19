import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'
import { withThemeByClassName } from '@storybook/addon-themes'


const parameters = {
  layout: 'padded',
  controls: { expanded: true },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark',  value: '#1c1b22' },
    ],
  },
}

export const decorators = [
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

