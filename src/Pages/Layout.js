import { Box, Container, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ShareIcon from '@mui/icons-material/Share';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';



export default function Layout() {

  const minWidth = 100;
  const maxWidth = 240;

  const [drawerWidth, setWidth] = useState(minWidth);
  const [showNewIcon, setNewIcon] = useState(false);


const classes = {
  arrowButton: {
    color: '#000000',
    display: 'flex',
    height: 30,
    width: 30,
  },
  logo: {
    fontWeight: 'bold'
  },

  drawerIcons: {
    height: 30,
    width: 30,
    color: '#000000',
    transition: 'transform 0.5s ease-in-out',
    display: 'flex', 
    justifyContent: 'center',
    width : !showNewIcon ? '100%' : '50%'
  },

  text : {
    
    width : !showNewIcon ? '0%' : '50%'
  }
};

const items = [
  {
    text: 'Dashboard',
    icon: <GridViewOutlinedIcon sx={{ color: '#000000', ...classes.drawerIcons }} />,
    path: '/'
  },
  {
    text: 'Shared Files',
    icon: <ShareIcon sx={{ color: '#000000', ...classes.drawerIcons }} />,
    path: '/add'
  },
  {
    text: 'Analytics',
    icon: <BarChartOutlinedIcon sx={{ color: '#000000', ...classes.drawerIcons }} />,
    path: '/add'
  },
  {
    text: 'Setting',
    icon: <SettingsOutlinedIcon sx={{ color: '#000000', ...classes.drawerIcons }} />,
    path: '/add'
  },
  {
    text: 'Notifications',
    icon: <NotificationsNoneOutlinedIcon sx={{ color: '#000000', ...classes.drawerIcons }} />,
    path: '/add'
  },
];

  const toggleDrawerWidth = () => {
    setWidth(drawerWidth === minWidth ? maxWidth : minWidth);
    setNewIcon(!showNewIcon);
  };

  return (
    <Container sx={{ backgroundColor: '#CBD7D9', display: 'flex', minHeight: '100vh' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          transition: 'width 0.5s ease-in-out',
          '& .MuiDrawer-paper': {
            backgroundColor: '#8AA2A8',
            width: drawerWidth,
            transition: 'width 0.5s ease-in-out',
            borderRight: 'none', // Supprime la bordure droite
            paddingTop: '20px',
          }
        }}
        variant='persistent'
        anchor='left'
        open
      >
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
          {showNewIcon ? (
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Typography variant='h5' sx={{ color: '#666666', ...classes.logo }}>Px</Typography>
              <Typography variant='h5' sx={{ color: '#26525D', ...classes.logo }}>Crypt.</Typography>
            </Box>
          ) : null}
          <IconButton onClick={toggleDrawerWidth}>
            {showNewIcon ? <ArrowBackIosNewIcon sx={classes.arrowButton} /> : <ArrowForwardIosIcon sx={classes.arrowButton} />}
          </IconButton>
        </Container>

        <List>
          {items.map(item => (
            <ListItem
              button
              sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', borderRadius: 0 }}
              key={item.text}
            >
            <Box>
              <ListItemIcon sx={classes.drawerIcons}>{item.icon}</ListItemIcon>
              </Box>
              <Typography noWrap sx={classes.text}>{showNewIcon ? item.text : null}</Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </Container>
  );
}
