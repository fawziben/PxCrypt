import * as React from "react"; // Import de React
import PropTypes from "prop-types"; // Import de PropTypes pour la validation des types de props
import Tabs from "@mui/material/Tabs"; // Import des onglets MUI
import Tab from "@mui/material/Tab"; // Import de l'onglet MUI
import Typography from "@mui/material/Typography"; // Import de la typographie MUI
import Box from "@mui/material/Box"; // Import de la boîte MUI
import { Container, TextField } from "@mui/material"; // Import du conteneur et du champ de texte MUI
import LoginForm from "./LoginForm"; // Import du formulaire de connexion
import SignUpForm from "./SignupForm"; // Import du formulaire d'inscription

// Styles pour les onglets
const classes = {
  tab: {
    marginTop: "30px", // Marge supérieure pour les onglets
    fontWeight: "bold", // Poids de la police en gras
    fontSize: "23px", // Taille de la police
    textTransform: "none", // Désactiver la transformation en majuscules
    color: "#255660", // Couleur du texte des onglets
    fontFamily: "Outfit", // Famille de police personnalisée
    opacity: "35%", // Opacité initiale des onglets

    "&.Mui-selected": {
      color: "#255660", // Couleur du texte de l'onglet actif
      opacity: "100%", // Opacité de l'onglet actif
    },
  },
};

// Composant de panneau d'onglets personnalisé
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel" // Rôle du panneau d'onglets
      hidden={value !== index} // Masquer si la valeur de l'onglet ne correspond pas à l'index
      id={`simple-tabpanel-${index}`} // ID du panneau d'onglets
      aria-labelledby={`simple-tab-${index}`} // ID de l'onglet associé
      {...other}
    >
      {/* Afficher les enfants si la valeur correspond à l'index */}
      {value === index && (
        <Box sx={{ paddingTop: 3 }}>
          {" "}
          {/* Style pour le padding du contenu du panneau */}
          <Typography>{children}</Typography>{" "}
          {/* Afficher le contenu du panneau */}
        </Box>
      )}
    </div>
  );
}

// Propriétés attendues pour le composant CustomTabPanel
CustomTabPanel.propTypes = {
  children: PropTypes.node, // Enfants du panneau d'onglets
  index: PropTypes.number.isRequired, // Index du panneau d'onglets
  value: PropTypes.number.isRequired, // Valeur de l'onglet sélectionné
};

// Fonction utilitaire pour les attributs d'accessibilité
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`, // ID de l'onglet
    "aria-controls": `simple-tabpanel-${index}`, // Contrôle associé au panneau d'onglets
  };
}

// Composant de panneaux d'onglets principaux
export default function SharedFilesTabs({ title1, title2, children }) {
  const [value, setValue] = React.useState(0); // État local pour la valeur de l'onglet sélectionné
  let i = -1; // Initialiser un compteur pour les index de panneaux d'onglets

  // Fonction de gestion du changement d'onglet
  const handleChange = (event, newValue) => {
    setValue(newValue); // Mettre à jour la valeur de l'onglet sélectionné
  };

  return (
    <div>
      {" "}
      {/* Div conteneur pour les panneaux d'onglets */}
      <Box>
        {" "}
        {/* Boîte pour les onglets */}
        {/* Afficher les onglets avec les titres fournis */}
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label={title1} {...a11yProps(0)} sx={classes.tab} />{" "}
          {/* Premier onglet */}
          <Tab label={title2} {...a11yProps(1)} sx={classes.tab} />{" "}
          {/* Deuxième onglet */}
        </Tabs>
      </Box>
      <Box sx={{ padding: 0 }}>
        {" "}
        {/* Boîte pour les panneaux d'onglets */}
        {/* Mapper les enfants (panneaux d'onglets) et les afficher */}
        {children.map((child) => (
          <CustomTabPanel value={value} index={(i = i + 1)} key={i}>
            {" "}
            {/* Panneau d'onglet personnalisé */}
            {child} {/* Contenu du panneau d'onglet */}
          </CustomTabPanel>
        ))}
      </Box>
    </div>
  );
}
