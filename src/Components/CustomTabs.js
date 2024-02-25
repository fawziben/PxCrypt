import * as React from 'react'; // Import de React
import PropTypes from 'prop-types'; // Import des types de propriétés pour la validation
import Tabs from '@mui/material/Tabs'; // Import des onglets MUI
import Tab from '@mui/material/Tab'; // Import de l'onglet MUI
import Typography from '@mui/material/Typography'; // Import de la typographie MUI
import Box from '@mui/material/Box'; // Import de la boîte MUI
import { Container, TextField } from '@mui/material'; // Import des composants MUI
import LoginForm from './LoginForm'; // Import du formulaire de connexion
import SignUpForm from './SignupForm'; // Import du formulaire d'inscription

// Styles des onglets
const classes = {
  tab: {
    marginTop: '30px',
    fontWeight: 'bold',
    fontSize: '23px',
    textTransform: 'none', // Désactiver la transformation en majuscules
    color: '#255660',
    fontFamily: 'Outfit',
    opacity: '35%',

    '&.Mui-selected': {
      color: '#255660', // Couleur du texte de l'onglet actif
      opacity: '100%',
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Composant principal des onglets personnalisés
export default function CustomTabs({ title1, title2, children }) {
  const [value, setValue] = React.useState(0); // État pour la valeur sélectionnée de l'onglet

  // Gestion du changement d'onglet
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box>
        {/* Onglets */}
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label={title1} {...a11yProps(0)} sx={classes.tab} /> {/* Onglet 1 */}
          <Tab label={title2} {...a11yProps(1)} sx={classes.tab} /> {/* Onglet 2 */}
        </Tabs>
      </Box>
      <Box>
        {/* Affichage des panneaux d'onglets en fonction de la valeur sélectionnée */}
        {children.map((child, index) => (
          <CustomTabPanel value={value} index={index} key={index}>
            {child}
          </CustomTabPanel>
        ))}
      </Box>
    </Container>
  );
}
