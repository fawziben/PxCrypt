import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  Drawer,
  Fab,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ShareIcon from "@mui/icons-material/Share";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const minWidth = 100;
  const maxWidth = 240;

  const [drawerWidth, setWidth] = useState(minWidth);
  const [showNewIcon, setNewIcon] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const classes = {
    arrowButton: {
      color: "#000000",
      display: "flex",
      height: 30,
      width: 30,
    },
    logo: {
      fontWeight: "bold",
    },

    drawerIcons: {
      height: 30,
      width: 30,
      color: "#000000",
      transition: "transform 0.5s ease-in-out",
      display: "flex",
      justifyContent: "center",
      width: !showNewIcon ? "100%" : "50%",
    },

    text: {
      width: !showNewIcon ? "0%" : "50%",
    },
  };

  const items = [
    {
      text: "Dashboard",
      icon: (
        <GridViewOutlinedIcon
          sx={{ color: "#000000", ...classes.drawerIcons }}
        />
      ),
      path: "/dashboard",
    },
    {
      text: "Shared Files",
      icon: <ShareIcon sx={{ color: "#000000", ...classes.drawerIcons }} />,
      path: "/dashboard/sharedfiles",
    },
    {
      text: "Analytics",
      icon: (
        <BarChartOutlinedIcon
          sx={{ color: "#000000", ...classes.drawerIcons }}
        />
      ),
      path: "/dashboard/analytics",
    },
    {
      text: "Setting",
      icon: (
        <SettingsOutlinedIcon
          sx={{ color: "#000000", ...classes.drawerIcons }}
        />
      ),
      path: "/add",
    },
    {
      text: "Notifications",
      icon: (
        <NotificationsNoneOutlinedIcon
          sx={{ color: "#000000", ...classes.drawerIcons }}
        />
      ),
      path: "/add",
    },
  ];

  const toggleDrawerWidth = () => {
    setWidth(drawerWidth === minWidth ? maxWidth : minWidth);
    setNewIcon(!showNewIcon);
  };
  const changeWindow = (item) => {
    navigate(item.path);
  };

  return (
    <div
      style={{
        backgroundColor: "#EFF3F3",
        display: "flex",
        minHeight: "100vh",
        overflowY: "hidden",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "transparent",
          width: `calc(100% - ${drawerWidth}px)`,
          paddingTop: "2%",
          marginBottom: "30px",
        }}
        elevation={0}
      >
        <Toolbar>
          <Container>
            <Box
              sx={{
                display: "flex",
                backgroundColor: "#ffffff",
                width: "70%",
                borderRadius: "10px",
              }}
            >
              <Box>
                <SearchIcon />
              </Box>
              <InputBase
                sx={{
                  height: "40px",
                  transition: "transform 0.5s ease-in-out",
                }}
                fullWidth
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Box>
          </Container>
          <Box sx={{ flexGrow: 1 }}></Box>
          {/* <Typography variant='h6' sx={classes.date}>
                    {format(new Date(),'do MMMM Y')}
                </Typography> */}
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Container>
              <Badge badgeContent={3} color="error">
                <NotificationsNoneOutlinedIcon
                  sx={{ color: "#000000", height: 30, width: 30 }}
                />
              </Badge>
            </Container>
          </IconButton>
          <Avatar sx={{ backgroundColor: "#C27821" }}>FB</Avatar>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          transition: "width 0.5s ease-in-out",
          "& .MuiDrawer-paper": {
            backgroundColor: "#CBD7D9",
            width: drawerWidth,
            transition: "width 0.5s ease-in-out",
            borderRight: "none", // Supprime la bordure droite
            paddingTop: "20px",
          },
        }}
        variant="persistent"
        anchor="left"
        open
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            marginBottom: "50px",
          }}
        >
          {showNewIcon ? (
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Typography
                variant="h5"
                sx={{ color: "#666666", ...classes.logo }}
              >
                Px
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#26525D", ...classes.logo }}
              >
                Crypt.
              </Typography>
            </Box>
          ) : null}
          <IconButton onClick={toggleDrawerWidth}>
            {showNewIcon ? (
              <ArrowBackIosNewIcon sx={classes.arrowButton} />
            ) : (
              <ArrowForwardIosIcon sx={classes.arrowButton} />
            )}
          </IconButton>
        </Container>

        <List>
          {items.map((item) => (
            <ListItem
              onClick={() => changeWindow(item)}
              button
              sx={{
                height: "80px",
                display: "flex",
                justifyContent: "center",
                borderRadius: 0,
                backgroundColor:
                  location.pathname == item.path ? "#8AA2A8" : null,
              }}
              key={item.text}
            >
              <Box sx={{ marginBottom: "0px" }}>
                <ListItemIcon sx={classes.drawerIcons}>
                  {item.icon}
                </ListItemIcon>
              </Box>
              <Typography noWrap sx={classes.text}>
                {showNewIcon ? item.text : null}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Outlet />
    </div>
  );
}
