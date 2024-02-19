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
        <Box sx={{ paddingTop: 3 }}>
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

export default function MainPageTabs( {title1, title2, children}) {
  const [value, setValue] = React.useState(0);
  let i = -1;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label={title1} {...a11yProps(0)} sx={classes.tab}/>
          <Tab label={title2} {...a11yProps(1)} sx={classes.tab}/>
        </Tabs>
      </Box>
      <Box sx={{padding : 0}}>
      {children.map(child => (
      <CustomTabPanel value={value} index={i = i+1} key={i}>
        {child}
      </CustomTabPanel>
      ))}
      </Box>
    </div>
  );
}
