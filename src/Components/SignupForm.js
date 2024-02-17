import { Password, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';

export default function SignUpForm() {

    const classes = {
        input : {
            fontFamily : 'Outfit',
            marginBottom : '10px',
            color : 'primary'           
        },

        root : {
            marginTop : '15px'
        },

        Button : {
            borderRadius : '20px',
            width : '150px',
            marginTop : '50px',
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
            label="First Name"
            required
            fullWidth
            sx={classes.input}
        />
        <TextField
            variant='standard'
            label="Last Name"
            required
            fullWidth
            sx={classes.input}
        />
        <TextField
            variant='standard'
            label="Email"
            required
            fullWidth
            type='email'
            sx={classes.input}
        />
        <TextField
            variant='standard'
            label="Password"
            type='password'
            required
            fullWidth
            sx={classes.input}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <InfoIcon/>
                    </IconButton>
                  </InputAdornment>
                ),
            }}
        />
        <TextField
            variant='standard'
            label="Confirm your password"
            required
            fullWidth
            sx={classes.input}
            type={showPassword ?  'text' : 'password'}
            InputLabelProps={{}}
            color='primary'
        />
        <Box sx={{display : 'flex', justifyContent : 'center'}}>
            <Button variant='contained' color='primary' sx={classes.Button}>
                <Typography variant ='p' fontWeight={'bold'}>
                    Create
                </Typography>
            </Button>
        </Box>
    </Box>
      
  )
}
