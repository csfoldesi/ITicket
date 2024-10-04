import { AccountCircle } from "@mui/icons-material";
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../../features/accounts/accountsStore";

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
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
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
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
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
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit">
            <AccountCircle />
          </IconButton>
          {userInfo ? menuAthorized() : menuUnathorized()}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
