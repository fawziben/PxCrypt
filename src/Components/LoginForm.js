import { Password, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function LoginForm() {
    const navigate = useNavigate()
    const handleClick = () => {
      window.electronAPI.loginSuccess()
      navigate ('add')
    }


    const classes = {
        input : {
            fontFamily : 'Outfit',
            marginBottom : '15px',
            color : 'primary'           
        },

        root : {
            marginTop : '80px'
        },

        Button : {
            borderRadius : '20px',
            width : '150px',
            marginTop : '100px',
        }
    }



    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  return (

    <Box sx={classes.root}>
        <TextField
            variant='standard'
            label="Enter your email"
            required
            fullWidth
            sx={classes.input}
        />
        <TextField
            variant='standard'
            label="Enter your password"
            required
            fullWidth
            sx={classes.input}
            type={showPassword ?  'text' : 'password'}
            InputLabelProps={{}}
            color='primary'
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
            }}
        />
        <Box sx={{display : 'flex', justifyContent : 'center'}}>
            <Button variant='contained' color='primary' sx={classes.Button} onClick={handleClick}>
                <Typography variant ='p' fontWeight={'bold'}>
                    Login
                </Typography>
            </Button>
        </Box>
    </Box>
      
  )
}
