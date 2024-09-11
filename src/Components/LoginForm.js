import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../AxiosInstance";
import { validateEmail } from "../Validators/inputValidators";
import OTPFile from "./OTPFile";
import CustomSnackbar from "./CustomSnackbar"; // Import du composant CustomSnackbar

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
  closeButton: {
    position: "absolute",
    right: 8,
    top: 8,
    color: "grey",
    "&:hover": {
      color: "red",
    },
  },
};

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [otp, setOtp] = useState(false);

  // States for Snackbar notifications
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success', 'error', 'warning', 'info'

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }

    try {
      const response = await axiosInstance.post("/email", {
        email,
        password,
      });

      console.log(response);

      if (response.status === 200) {
        setOtp(true);
        setSnackbarMessage("OTP sent successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else if (response.status === 202) {
        localStorage.setItem("token", response.data.access_token);
        sessionStorage.setItem("id", response.data.user_id);
        window.electronAPI.loginSuccess();
        navigate("dashboard");
      }
    } catch (error) {
      if (error.response?.status == 403) {
        setSnackbarMessage("Your account has been blocked");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } else if (error.response?.status == 401) {
        setSnackbarMessage("Wrong password");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } else if (error.response?.status == 404) {
        setSnackbarMessage("Wrong informations");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setOtp(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={classes.root}>
      <form onSubmit={handleLogin}>
        <TextField
          variant="standard"
          label="Enter your email"
          required
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
          sx={classes.input}
          error={emailError}
          helperText={emailError && "Invalid email format"}
        />
        <TextField
          variant="standard"
          label="Enter your password"
          required
          fullWidth
          sx={classes.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
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

      <Dialog open={otp} onClose={handleClose}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <OTPFile email={email} />
        </DialogContent>
      </Dialog>

      {/* Using CustomSnackbar for notifications related to API responses */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
}
