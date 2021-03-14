import { createMuiTheme, Theme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

// define light theme colors
export const lightTheme: Theme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: blue[800],
        },
        secondary: {
            main: grey[900],
        },
    },
});

// define dark theme colors
export const darkTheme: Theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: grey[900],
        },
        secondary: {
            main: blue[800],
        },
    },
});