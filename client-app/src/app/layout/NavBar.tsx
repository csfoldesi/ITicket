import { AppBar, Button, Toolbar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button component={RouterLink} color="inherit" to={"/"}>
          Home
        </Button>
        <Button component={RouterLink} color="inherit" to={"/venues"}>
          Venues
        </Button>
        <Button component={RouterLink} color="inherit" to={"/events"}>
          Events
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
