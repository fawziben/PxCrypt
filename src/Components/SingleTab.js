import * as React from "react"; // Import de React
import PropTypes from "prop-types"; // Import des types de propriétés pour la validation
import Tabs from "@mui/material/Tabs"; // Import des onglets MUI
import Tab from "@mui/material/Tab"; // Import de l'onglet MUI
import Typography from "@mui/material/Typography"; // Import de la typographie MUI
import Box from "@mui/material/Box"; // Import de la boîte MUI
import { Container, TextField } from "@mui/material"; // Import des composants MUI

// Styles des onglets
const classes = {
  tab: {
    marginTop: "30px",
    fontWeight: "bold",
    fontSize: "23px",
    textTransform: "none", // Désactiver la transformation en majuscules
    color: "#255660",
    fontFamily: "Outfit",
    opacity: "35%",

    "&.Mui-selected": {
      color: "#255660", // Couleur du texte de l'onglet actif
      opacity: "100%",
    },
  },
};

// Fonction pour le panneau d'onglet personnalisé
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Fonction pour les attributs d'accessibilité
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Composant principal des onglets personnalisés
export default function SingleTab({ title, children }) {
  const [value, setValue] = React.useState(0); // État pour la valeur sélectionnée de l'onglet

  // Gestion du changement d'onglet
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={0}
        onChange={handleChange}
        aria-label="basic tabs example"
        centered
        sx={{ marginBottom: "25px" }}
      >
        <Tab label={title} {...a11yProps(0)} sx={classes.tab} />{" "}
        {/* Onglet 1 */}
      </Tabs>
      {/* Affichage des panneaux d'onglets en fonction de la valeur sélectionnée */}
      <CustomTabPanel value={0} index={0}>
        {children}
      </CustomTabPanel>
    </div>
  );
}
