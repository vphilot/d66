// Imports
import { ResponsiveHelper } from './createBreakpoints'
import { BREAKPOINT_VALUES } from './breakpoints'

// Types
export type D66ThemeType = {
  breakpoints?: ResponsiveHelper,
  colors: { [key: string]: string },
  font: {
    family: string,
    weight: { [key: string]: string }
  }
}

// custom Theme
export const d66Theme:D66ThemeType = {
  breakpoints: new ResponsiveHelper(BREAKPOINT_VALUES),
  colors: {
    white: '#F53B47',
    light: '#C0CAD8',
    dark: '#1F4055',
    red: '#F53B47',
    orange: '#FF9C83',
    blue: '#6AD5D3',
    green: '2DF092',
  },
  font: {
    family: 'SpaceGrotesk',
    weight: {
      medium: '500',
      bold: '700',
    },
  },
}
