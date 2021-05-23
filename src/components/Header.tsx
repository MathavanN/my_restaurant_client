import { FC, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { Button, Tooltip, Menu, MenuItem } from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn, setSignOut } from '../features/signIn/signInSlice';
import {
  DRAWER_WIDTH,
  APP_TITLE,
  PAGE_SIGN_IN,
  PAGE_HOME,
} from '../config/constants';

interface IProps {
  open: boolean;
  handleMenuOpen: () => void;
  toggleTheme: () => void;
  useDefaultTheme: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));

const Header: FC<IProps> = ({
  open,
  handleMenuOpen,
  toggleTheme,
  useDefaultTheme,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const view = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSingOut = () => {
    dispatch(setSignOut());
    setAnchorEl(null);
    history.push(PAGE_HOME.path);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open menu"
            onClick={handleMenuOpen}
            className={clsx(classes.menuButton, {
              [classes.menuButtonHidden]: open,
            })}
            size="small"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {APP_TITLE}
          </Typography>
          <IconButton onClick={toggleTheme}>
            {useDefaultTheme ? (
              <Tooltip title="Switch to dark mode" placement="bottom">
                <Brightness3Icon />
              </Tooltip>
            ) : (
              <Tooltip title="Switch to light mode" placement="bottom">
                <Brightness7Icon />
              </Tooltip>
            )}
          </IconButton>
          {isLoggedIn ? (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                size="small"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={view}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                <MenuItem onClick={handleSingOut}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <NavLink
              to={`${PAGE_SIGN_IN.path}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button variant="contained">Sign In</Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
