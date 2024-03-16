import { Box, Container, Drawer } from "@mui/material"; // Import des composants MUI
import React from "react"; // Import de React
import myimg from "../Ressources/cyber-4084714_1280.jpg"; // Import de l'image d'arrière-plan
import "./login.css"; // Import des styles CSS spécifiques à cette page
import CustomTabs from "../Components/CustomTabs"; // Import du composant CustomTabs
import LoginForm from "../Components/LoginForm"; // Import du formulaire de connexion
import SignUpForm from "../Components/SignupForm/SignupForm"; // Import du formulaire d'inscription

// Définition de la largeur du tiroir
const drawerWidth = 320;

// Styles personnalisés pour les composants de cette page
const classes = {
  drawer: {
    width: drawerWidth, // Largeur du tiroir
    "& .MuiDrawer-paper": {
      // Sélecteur pour le papier du tiroir
      width: drawerWidth, // Largeur du papier du tiroir
      backgroundImage: `url(${myimg})`, // Image d'arrière-plan du tiroir
      backgroundSize: "cover", // Ajustez la taille de fond pour couvrir tout le conteneur
      backgroundRepeat: "no-repeat", // Répétition de l'image d'arrière-plan
      backgroundPosition: "center", // Centrez l'image horizontalement
      display: "flex", // Affichage en flexbox
      flexDirection: "column", // Direction de la colonne
      justifyContent: "center", // Centrage vertical
    },
  },
  root: {
    display: "flex", // Affichage en flexbox
    justifyContent: "center", // Centrage horizontal
  },
};

// Composant de la page de connexion
export default function Login() {
  return (
    <Box sx={classes.root}>
      {" "}
      {/* Boîte principale */}
      <Drawer // Tiroir latéral
        sx={classes.drawer} // Styles du tiroir
        variant="persistent" // Variante du tiroir (persistent)
        anchor="left" // Ancrage du tiroir (gauche)
        open // Ouvert par défaut
      />
      <Box sx={{ width: "100%" }}>
        {" "}
        {/* Boîte pour contenir les onglets de connexion et d'inscription */}
        {/* Composant CustomTabs pour afficher les onglets de connexion et d'inscription */}
        <CustomTabs title1="Login" title2="SignUp">
          {/* Formulaire de connexion */}
          <LoginForm />
          {/* Formulaire d'inscription */}
          <SignUpForm />
        </CustomTabs>
      </Box>
      {/* Boîtes floues pour ajouter un effet de flou à l'arrière-plan */}
      <Box className="blur1" />
      <Box className="blur2"></Box>
    </Box>
  );
}
