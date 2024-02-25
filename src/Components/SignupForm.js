import { Password, Visibility, VisibilityOff } from '@mui/icons-material'; // Import des icônes MUI
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'; // Import des composants MUI
import React, { useState } from 'react'; // Import de React et useState
import InfoIcon from '@mui/icons-material/Info'; // Import de l'icône d'information MUI

// Composant SignUpForm
export default function SignUpForm() {
    // Définition des styles
    const classes = {
        input: {
            fontFamily: 'Outfit', // Famille de police personnalisée
            marginBottom: '10px', // Marge inférieure
            color: 'primary' // Couleur du texte
        },
        root: {
            marginTop: '15px' // Marge supérieure
        },
        Button: {
            borderRadius: '20px', // Bordure arrondie
            width: '150px', // Largeur
            marginTop: '50px' // Marge supérieure
        }
    };

    // État local pour afficher ou masquer le mot de passe
    const [showPassword, setShowPassword] = useState(false);

    // Fonction pour afficher ou masquer le mot de passe
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={classes.root}> {/* Boîte racine */}
            {/* Champ de saisie pour le prénom */}
            <TextField
                variant='standard' // Variante standard
                label="First Name" // Libellé du champ
                required // Champ requis
                fullWidth // Largeur complète
                sx={classes.input} // Styles personnalisés
            />
            {/* Champ de saisie pour le nom de famille */}
            <TextField
                variant='standard'
                label="Last Name"
                required
                fullWidth
                sx={classes.input}
            />
            {/* Champ de saisie pour l'email */}
            <TextField
                variant='standard'
                label="Email"
                required
                fullWidth
                type='email' // Type d'entrée pour l'email
                sx={classes.input}
            />
            {/* Champ de saisie pour le mot de passe */}
            <TextField
                variant='standard'
                label="Password"
                type={showPassword ? 'text' : 'password'} // Type de champ (texte ou mot de passe)
                required
                fullWidth
                sx={classes.input}
                InputProps={{
                    endAdornment: ( // Élément à la fin du champ
                        <InputAdornment position="end">
                            {/* Bouton d'information */}
                            <IconButton edge="end">
                                <InfoIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {/* Champ de saisie pour confirmer le mot de passe */}
            <TextField
                variant='standard'
                label="Confirm your password"
                required
                fullWidth
                sx={classes.input}
                type={showPassword ? 'text' : 'password'} // Type de champ (texte ou mot de passe)
                InputLabelProps={{}} // Propriétés du libellé d'entrée
                color='primary' // Couleur primaire
            />
            {/* Bouton pour créer un compte */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}> {/* Boîte pour centrer le bouton */}
                <Button variant='contained' color='primary' sx={classes.Button}> {/* Bouton */}
                    <Typography variant='p' fontWeight='bold'> {/* Texte en gras */}
                        Create {/* Texte du bouton */}
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
}
