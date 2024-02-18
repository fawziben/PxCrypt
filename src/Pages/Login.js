import { Box, Container, Drawer } from '@mui/material'
import React from 'react'
import myimg from '../Ressources/cyber-4084714_1280.jpg'
import './login.css'
import LoginTabs from '../Components/LoginTabs'
import LoginForm from '../Components/LoginForm'
import SignUpForm from '../Components/SignupForm'


const drawerWidth = 320
const classes = {
  drawer: {
    width: drawerWidth,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      backgroundImage: `url(${myimg})`,
      backgroundSize: 'cover',  // Ajustez la taille de fond pour couvrir tout le conteneur
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',  // Centrez l'image horizontalement.
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },

  root: {
    display: 'flex',
    justifyContent: 'center',
  },
}

export default function Login({children}) {
  return (
<Box sx={classes.root}>
    <Drawer
      sx={classes.drawer}
      variant='persistent' 
      anchor='left' 
      open
    />
    
    <Box sx={{ width: '100%' }}> {/* Ajoutez cette ligne */}
      <LoginTabs>
        <LoginForm/>
        <SignUpForm/>
      </LoginTabs>
    </Box>
    <Box className='blur1' />
    <Box className='blur2'></Box>
</Box>
  )
}
