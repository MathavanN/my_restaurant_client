import {
  CssBaseline,
  makeStyles,
  Theme,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { FC, useState } from "react";
import { APP_TITLE, DRAWER_WIDTH, PAGE_USER_SIGN_IN } from "../utils/constants";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import AccountCircle from "@material-ui/icons/AccountCircle";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAccessJWT, signOut } from "../features/user/userSlice";

interface IProps {
  open: boolean;
  handleMenuOpen: () => void;
  toggleTheme: () => void;
  useDefaultTheme: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
}));

const Header: FC<IProps> = ({
  open,
  handleMenuOpen,
  toggleTheme,
  useDefaultTheme,
}) => {
  const dispatch = useDispatch();
  const accessJWT = useSelector(getAccessJWT);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const view = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSingOut = () => {
    dispatch(signOut());
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={handleMenuOpen}
              edge="start"
              className={clsx(classes.menuButton, { [classes.hide]: open })}
              size="small"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {APP_TITLE}
            </Typography>
          </div>
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
          {accessJWT ? (
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
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={view}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                <MenuItem onClick={handleSingOut}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <NavLink
              to={`${PAGE_USER_SIGN_IN.path}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button>Sign In</Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
