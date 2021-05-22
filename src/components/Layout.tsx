import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { FC, ReactNode, useReducer } from 'react';
import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation'
import clsx from "clsx";
import { DRAWER_WIDTH, FOOTER_HEIGHT } from '../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    content: {
        padding: theme.spacing(3),
        minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
        background: theme.palette.background.paper,
        marginLeft: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        ...theme.mixins.toolbar,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: DRAWER_WIDTH,
    }
}));

interface IProps {
    toggleTheme: () => void;
  useDefaultTheme: boolean;
    children: ReactNode;
}


const Layout: FC<IProps> = ({ toggleTheme, useDefaultTheme, children }) => {
    const classes = useStyles();
    const [open, toggle] = useReducer((open) => !open, false);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header open={open}
                handleMenuOpen={toggle}
                toggleTheme={toggleTheme}
        useDefaultTheme={useDefaultTheme}
         />
            <Navigation open={open} handleMenuClose={toggle} />
            <main className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                <div className={classes.toolbar} />
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout
