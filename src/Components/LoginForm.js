import { Password, Visibility, VisibilityOff } from '@mui/icons-material'; // Import des icônes MUI
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'; // Import des composants MUI
import React, { useState } from 'react'; // Import de React et useState
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate pour la navigation

export default function LoginForm() {
    const navigate = useNavigate(); // Initialisation du hook de navigation
    const handleClick = () => {
      window.electronAPI.loginSuccess(); // Appel d'une fonction depuis l'API Electron
      navigate('dashboard'); // Navigation vers la page 'add'
    };

    // Styles des composants
    const classes = {
        input: {
            fontFamily: 'Outfit',
            marginBottom: '15px',
            color: 'primary'           
        },
        root: {
            marginTop: '80px'
        },
        Button: {
            borderRadius: '20px',
            width: '150px',
            marginTop: '100px',
        }
    };

    // Gestion de l'état de l'affichage du mot de passe
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword); // Inversion de l'état de l'affichage du mot de passe
    };

    return (
        <Box sx={classes.root}>
            {/* Champ de saisie pour l'email */}
            <TextField
                variant='standard'
                label="Enter your email"
                required
                fullWidth
                sx={classes.input}
            />
            {/* Champ de saisie pour le mot de passe */}
            <TextField
                variant='standard'
                label="Enter your password"
                required
                fullWidth
                sx={classes.input}
                type={showPassword ?  'text' : 'password'} // Affichage du texte ou du mot de passe en fonction de l'état
                InputLabelProps={{}}
                color='primary'
                // Affichage du bouton pour afficher/masquer le mot de passe
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
            {/* Bouton de connexion */}
            <Box sx={{display : 'flex', justifyContent : 'center'}}>
                <Button variant='contained' color='primary' sx={classes.Button} onClick={handleClick}>
                    <Typography variant ='p' fontWeight={'bold'}>
                        Login
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
}
