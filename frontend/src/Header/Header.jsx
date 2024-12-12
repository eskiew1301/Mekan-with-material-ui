import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store";
import DrawerComp from "./DrawerComp";

const LINKS = ["home", "about us", "services", "contact us"];
const SUB_LINKS = ["image gallery", "document gallery", "projects"];

const Header = () => {
  const isMatch = useMediaQuery(useTheme().breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(0);

  const openMenu = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleLogoutClick = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <AppBar sx={{ position: "sticky" }}>
      {isMatch ? (
        <Box display="flex" alignItems="center">
          <Box width={50} height={50}>
            <img
              src="/logo.jpeg"
              alt="Logo"
              width="100%"
              height="100%"
              style={{ borderRadius: "50%" }}
            />
          </Box>
          <Typography
            variant="h6"
            fontFamily={'"Nunito Sans", sans-serif'}
            sx={{ color: "white", padding: 0.5, margin: "auto" }}
          >
            {" "}
            MEKAN CONSULT
          </Typography>
          <DrawerComp links={LINKS} subLinks={SUB_LINKS} />
          {isLoggedIn ? (
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                variant="outlined"
                sx={{ color: "white", bgcolor: "#32cd32" }}
                onClick={handleLogoutClick}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                variant="outlined"
                sx={{ color: "white", bgcolor: "green" }}
                component={Link}
                to="/users/login"
              >
                Login
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <Toolbar>
          <Box width={100} height={100}>
            <img
              src="/logo.jpeg"
              alt="Logo"
              width="100%"
              height="100%"
              style={{ borderRadius: "50%" }}
            />
          </Box>

          <Tabs
            value={value}
            sx={{ marginLeft: "auto", textDecoration: "none" }}
            onChange={(e, val) => setValue(val)}
            indicatorColor="secondary"
            textColor="inherit"
          >
            {LINKS.map((link, index) => (
              <Tab
                LinkComponent={Link}
                to={`/${link === "home" ? "" : link.replace(/\s+/g, "-")}`}
                sx={{
                  color: "inherit",
                  ":hover": {
                    textDecoration: "underline",
                    textUnderlineOffset: "28px",
                    ":active": {
                      color: "inherit",
                    },
                  },
                }}
                key={index}
                label={link}
              />
            ))}

            <Tab
              sx={{
                color: "inherit",
                ":hover": {
                  textDecoration: "underline",
                  textUnderlineOffset: "7px",
                },
              }}
              label="Library"
              aria-controls="library-menu"
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : "undefined"}
              onClick={handleClick}
              icon={<KeyboardArrowDownIcon sx={{ color: "white" }} />}
              iconPosition="end"
            ></Tab>
            {isLoggedIn &&<Tab
                LinkComponent={Link}
                to={`/users`}
                sx={{
                  color: "inherit",
                  ":hover": {
                    textDecoration: "underline",
                    textUnderlineOffset: "28px",
                    ":active": {
                      color: "inherit",
                    },
                  },
                }}
                label='Users'
              />}
          </Tabs>

          <Menu
            id="library-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
          >
            {SUB_LINKS.map((subLink, index) => (
              <MenuItem
                component={Link}
                to={`/${subLink.replace(/\s+/g, "-")}`}
                key={index}
                onClick={handleClose}
                sx={{ textTransform: "uppercase" }}
              >
                {subLink}
              </MenuItem>
            ))}
          </Menu>

          {isLoggedIn ? (
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                variant="outlined"
                sx={{ color: "white", bgcolor: "#32cd32" }}
                onClick={handleLogoutClick}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                variant="outlined"
                sx={{ color: "white", bgcolor: "green" }}
                component={Link}
                to="/users/login"
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;
