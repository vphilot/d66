// Imports
import { createMuiTheme } from '@material-ui/core/styles'
import { Shadows } from '@material-ui/core/styles/shadows'
import { ResponsiveHelper } from './createBreakpoints'
import { BREAKPOINT_VALUES } from './breakpoints'

// Types
export type D66ThemeType = {
  breakpoints?: ResponsiveHelper,
  colors: { [key: string]: string },
  font: {
    family: string,
    weight: { [key: string]: string }
  },
  spacing: { [key: string]: number }
  boxShadow: string,
}

// custom Theme
export const d66Theme:D66ThemeType = {
  breakpoints: new ResponsiveHelper(BREAKPOINT_VALUES),
  colors: {
    white: '#FFFFFF',
    light: '#C0CAD8',
    gray: '#848D98',
    dark: '#1F4055',
    red: '#F53B47',
    orange: '#FF9C83',
    blue: '#6AD5D3',
    green: '#2DF092',
  },
  font: {
    family: 'SpaceGrotesk',
    weight: {
      medium: '500',
      bold: '700',
    },
  },
  spacing: {
    base: 20,
  },
  boxShadow: '0px 0px 5px 0px #F53B47',
}

// MuiTheme
export const muiTheme = createMuiTheme({
  typography: {
    fontFamily: d66Theme.font.family,
    button: {
      textTransform: 'unset',
      fontSize: '1.4rem',
    },
  },
  palette: {
    primary: {
      main: d66Theme.colors.red,
    },
    secondary: {
      main: d66Theme.colors.dark,
    },
    error: {
      main: d66Theme.colors.dark,
    },
    text: {
      primary: d66Theme.colors.red,
      secondary: d66Theme.colors.dark,
    },
  },
  shadows: Array(25).fill('none') as Shadows,
  overrides: {
    MuiButton: {
      root: {
        '&:hover': {
          backgroundColor: d66Theme.colors.red,
          boxShadow: d66Theme.boxShadow,
        },
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: d66Theme.colors.red,
          boxShadow: d66Theme.boxShadow,
        },
      },
      outlinedPrimary: {
        border: `1px solid ${d66Theme.colors.red}`,
        '&:hover': {
          backgroundColor: 'transparent',
          boxShadow: d66Theme.boxShadow,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        color: d66Theme.colors.dark,
      },
      notchedOutline: {
        borderColor: d66Theme.colors.red,
      },
    },
    MuiFormLabel: {
      root: {
        color: d66Theme.colors.red,
        borderColor: d66Theme.colors.red,
      },
    },
    MuiIconButton: {
      root: {
        padding: 0,
      },
      colorPrimary: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: '30px',
      },
    },
    MuiChip: {
      root: {
        borderRadius: 5,
      },
    },
  },
})
