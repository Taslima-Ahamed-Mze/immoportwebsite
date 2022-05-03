import { createTheme } from '@mui/material/styles';

export const DefaultTheme = createTheme({
    palette: {
      primary: {
        main: '#2e282a',
        light: '#2b2b2b',
        dark: '#000000',
      },
      secondary: {
        main: '#f70000',
        light: '#e5383b',
        dark: '#ba181b',
      },
      background: {
        default: '#dcdcdc',
        paper: '#BFC0C0',
      },
      text: {
        primary: '#ffffff',
        secondary: '#eeeeee',
        disabled: '#cdcdcd',
      },
      error: {
        main: '#ff421c',
        dark: '#de1a1a',
        light: '#f26419',
      },
      warning: {
        main: '#ffa900',
        light: '#f6ae2d',
        dark: '#ff9000',
      },
    },
  });