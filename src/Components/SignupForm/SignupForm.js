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
import {
  validateEmail,
  validatePhoneNumber,
} from "../../Validators/inputValidators";

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

export default function SignUpForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [email, setEmail] = useState(""); // État pour stocker l'email
  const [emailError, setEmailError] = useState(false); // État pour gérer l'erreur d'email

  const handleCreate = (e) => {
    e.preventDefault();

    // Vérification de l'email

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError(true);
      return;
    }
  };

  return (
    <Box sx={classes.root}>
      <form onSubmit={handleCreate}>
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
          label="Enter your email"
          required
          fullWidth
          value={email} // Valeur du champ email provenant de l'état local
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false); // Réinitialisation de l'erreur d'email lors de la modification de l'email
          }}
          sx={classes.input}
          error={emailError} // Utilisation de l'erreur d'email pour afficher une mise en forme spécifique
          helperText={emailError && "Invalid email format"} // Message d'erreur affiché en cas d'erreur d'email
        />
        <TextField
          variant="standard"
          label="Phone number"
          value={phoneNumber}
          required
          fullWidth
          type="number"
          onChange={(e) => {
            if (e.target.value.length <= 9) {
              setPhoneNumber(e.target.value);
            }
            setPhoneNumberError(false); // Réinitialisation de l'erreur d'email lors de la modification de l'email
          }}
          error={phoneNumberError}
          helperText={phoneNumberError && "Invalid phone number format"} // Message d'erreur affiché en cas d'erreur d'email
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
          <Button
            variant="contained"
            color="primary"
            sx={classes.Button}
            type="submit"
          >
            <Typography variant="p" fontWeight="bold">
              Create
            </Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );
}
