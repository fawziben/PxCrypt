import { Password, Visibility, VisibilityOff } from "@mui/icons-material"; // Import des icônes MUI
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material"; // Import des composants MUI
import React, { useState } from "react"; // Import de React et useState
import { useNavigate } from "react-router-dom"; // Import du hook useNavigate pour la navigation
import { axiosInstance } from "../AxiosInstance";
import { validateEmail } from "../Validators/inputValidators";

const classes = {
  input: {
    fontFamily: "Outfit",
    marginBottom: "15px",
    color: "primary",
  },
  root: {
    marginTop: "80px",
  },
  Button: {
    borderRadius: "20px",
    width: "150px",
    marginTop: "100px",
  },
};

export default function LoginForm() {
  const navigate = useNavigate(); // Initialisation du hook de navigation
  // Gestion de l'état de l'affichage du mot de passe
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // État pour stocker l'email
  const [password, setPassword] = useState(""); // État pour stocker le mot de passe
  const [emailError, setEmailError] = useState(false); // État pour gérer l'erreur d'email

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      console.log(response);

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        window.electronAPI.loginSuccess(); // Appel d'une fonction depuis l'API Electron
        navigate("dashboard");
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Inversion de l'état de l'affichage du mot de passe
  };

  return (
    <Box sx={classes.root}>
      <form onSubmit={handleLogin}>
        {/* Champ de saisie pour l'email */}
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
        {/* Champ de saisie pour le mot de passe */}
        <TextField
          variant="standard"
          label="Enter your password"
          required
          fullWidth
          sx={classes.input}
          value={password} // Valeur du champ password provenant de l'état local
          onChange={(e) => setPassword(e.target.value)} // Fonction de mise à jour de l'état password
          type={showPassword ? "text" : "password"} // Affichage du texte ou du mot de passe en fonction de l'état
          InputLabelProps={{}}
          color="primary"
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={classes.Button}
          >
            <Typography variant="p" fontWeight={"bold"}>
              Login
            </Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );
}
