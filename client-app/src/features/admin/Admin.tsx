import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Admin = () => {
  const MenuList = (
    <Box sx={{ padding: "1em" }} role="presentation">
      <List>
        <Link to={"venues"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MapsHomeWorkIcon />
              </ListItemIcon>
              <ListItemText primary="Venues" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={"events"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div style={{ display: "flex", justifyContent: "left", width: "100%" }}>
      <div style={{ position: "fixed" }}>{MenuList}</div>
      <div style={{ width: "100%", padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
