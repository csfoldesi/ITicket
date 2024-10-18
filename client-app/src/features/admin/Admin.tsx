import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";

const Admin = () => {
  const MenuList = (
    <Box sx={{ width: 250 }} role="presentation">
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
      </List>
      <Divider />
    </Box>
  );

  return (
    <div style={{ display: "flex", justifyContent: "left" }}>
      <div>{MenuList}</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
