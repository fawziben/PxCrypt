import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import "./input.css";
import { useState } from "react";

export default function SignUpForm() {
  const classes = {
    input: {
      fontFamily: "Outfit",
      marginBottom: "10px",
      color: "primary",
    },
    root: {
      marginTop: "-10px",
    },
    Button: {
      borderRadius: "20px",
      width: "150px",
      marginTop: "40px",
    },
  };
  const [phoneNumber, setPhoneNumber] = useState("");
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    if (e.target.value.length <= 9) {
      setPhoneNumber(e.target.value);
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const isValidPhoneNumber = (value) => {
    // Vérifie si la longueur de l'entrée est exactement égale à 10 après le préfixe "06"
    return (
      (value.startsWith("5") ||
        value.startsWith("6") ||
        value.startsWith("7")) &&
      value.length === 9
    );
  };

  return (
    <Box sx={classes.root}>
      <TextField
        variant="standard"
        label="First Name"
        required
        fullWidth
        sx={classes.input}
      />
      <TextField
        variant="standard"
        label="Last Name"
        required
        fullWidth
        sx={classes.input}
      />
      <TextField
        variant="standard"
        label="Email"
        required
        fullWidth
        type="email"
        sx={classes.input}
      />
      <TextField
        variant="standard"
        label="Phone number"
        value={phoneNumber}
        required
        fullWidth
        type="number"
        onChange={handleChange}
        onSelect={handleBlur}
        error={!isValidPhoneNumber(phoneNumber) && touched}
        helperText={
          touched && !isValidPhoneNumber(phoneNumber)
            ? "Incorrect phone number"
            : ""
        }
        sx={classes.input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">+213</InputAdornment>
          ),
          maxLength: 10,
        }}
      />
      <TextField
        type="password"
        variant="standard"
        label="Password"
        required
        fullWidth
        sx={classes.input}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end">
                <InfoIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        variant="standard"
        type="password"
        label="Confirm your password"
        required
        fullWidth
        sx={classes.input}
        InputLabelProps={{}}
        color="primary"
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary" sx={classes.Button}>
          <Typography variant="p" fontWeight="bold">
            Create
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
