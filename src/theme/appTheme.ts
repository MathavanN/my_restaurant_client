import { createMuiTheme, Theme } from '@material-ui/core/styles';

export const lightTheme: Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#7986cb',
      main: '#3f51b5',
      dark: '#303f9f',
    },
    secondary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
    },
  },
});

// define dark theme colors
export const darkTheme: Theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
    },
    secondary: {
      light: '#7986cb',
      main: '#3f51b5',
      dark: '#303f9f',
    },
  },
});
