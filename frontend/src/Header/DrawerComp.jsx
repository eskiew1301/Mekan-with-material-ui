import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DrawerComp = ({ links, subLinks }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = Boolean(anchorEl);

  const handleDrawerToggle = () => setOpenDrawer((prev) => !prev);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenDrawer(!openDrawer);
  };

  const handleLogoutClick = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <>
      {/* Trigger for Drawer */}
      <MenuRoundedIcon
        onClick={handleDrawerToggle}
        sx={{ cursor: "pointer", marginLeft: "auto" }}
      />

      {/* Drawer */}
      <Drawer open={openDrawer} onClose={handleDrawerToggle} sx={{"& .MuiDrawer-paper": {
          width: '50%' // Set the desired width
        },}}>
        <List>
          {links.map((link, index) => (
            <ListItemButton
              onClick={() => setOpenDrawer(!openDrawer)}
              component={Link}
              to={`/${link === "home" ? "" : link.replace(/\s+/g, "-")}`}
              key={index}
            >
              <ListItemText sx={{ textTransform: "uppercase" }}>
                {link}
              </ListItemText>
            </ListItemButton>
          ))}

          {isLoggedIn && (
            <ListItemButton
              onClick={() => setOpenDrawer(!openDrawer)}
              component={Link}
              to={`/users`}
            >
              <ListItemText sx={{ textTransform: "uppercase" }}>
                users
              </ListItemText>
            </ListItemButton>
          )}
          {/* Library with dropdown */}
          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemText
                primary="LIBRARY"
                sx={{ textTransform: "uppercase" }}
              />
              <KeyboardArrowDownIcon sx={{ color: "black" }} />
            </ListItemButton>
          </ListItem>
        </List>

        {/* Dropdown Menu */}
        <Menu
          id="library-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
        >
          {subLinks.map((subLink, index) => (
            <MenuItem
              component={Link}
              to={`/${subLink.replace(/\s+/g, "-").toLowerCase()}`}
              key={index}
              onClick={handleClose}
              sx={{ textTransform: "uppercase" }}
            >
              {subLink}
            </MenuItem>
          ))}
        </Menu>
      </Drawer>
    </>
  );
};

export default DrawerComp;
