import { AccountCircle } from "@mui/icons-material";
import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../../features/accounts/accountsStore";
import { Roles } from "../models/account";
import BreadcrumbsView from "./BreadcrumbsView";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const userInfo = useAppSelector((state) => state.accounts.userInfo);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menuUnathorized = () => {
    return (
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock>
        <MenuItem onClick={handleClose} component={RouterLink} to={"/login"}>
          Login
        </MenuItem>
        <MenuItem onClick={handleClose} component={RouterLink} to={"/register"}>
          Register
        </MenuItem>
      </Menu>
    );
  };

  const menuAthorized = () => {
    return (
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock>
        <MenuItem onClick={handleClose} component={RouterLink} to={"/profile"}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    );
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <Button component={RouterLink} color="inherit" to={"/"}>
            Home
          </Button>
          <Button component={RouterLink} color="inherit" to={"/venues"}>
            Venues
          </Button>
          <Button component={RouterLink} color="inherit" to={"/events"}>
            Events
          </Button>
          {userInfo?.roles.includes(Roles.Admin) && (
            <Button component={RouterLink} color="inherit" to={"/admin"}>
              Admin
            </Button>
          )}
        </Typography>
        <div>
          <Button
            startIcon={<AccountCircle />}
            color="inherit"
            onClick={handleMenu}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true">
            {userInfo && userInfo.email}
          </Button>
          {userInfo ? menuAthorized() : menuUnathorized()}
        </div>
      </Toolbar>
      <BreadcrumbsView />
    </AppBar>
  );
};

export default NavBar;
