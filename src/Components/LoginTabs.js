import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container, TextField } from '@mui/material';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';

const classes = {
  tab : {
    marginTop : '30px',
    fontWeight : 'bold',
    fontSize: '23px',
    textTransform: 'none', // Désactiver la transformation en majuscules
    color : '#255660',
    fontFamily : 'Outfit',
    opacity : '35%',

    '&.Mui-selected': {
      color: '#255660', // Couleur du texte de l'onglet actif
      opacity : '100%',
    },

  }
}


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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function LoginTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Login" {...a11yProps(0)} sx={classes.tab}/>
          <Tab label="SignUp" {...a11yProps(1)} sx={classes.tab}/>
        </Tabs>
      </Box>
      <Box>
      <CustomTabPanel value={value} index={0}>
        <LoginForm/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SignUpForm/>
      </CustomTabPanel>
      </Box>
    </Container>
  );
}
