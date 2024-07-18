import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { axiosInstance } from "../../AxiosInstance";
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
  button: {
    borderRadius: "20px",
    width: "150px",
    marginTop: "40px",
  },
};

const SignUpForm = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const validatePasswordPolicy = (password) => {
    // Au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return regex.test(password);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError(true);
      return;
    }
    if (!validatePasswordPolicy(password)) {
      setPasswordError(true);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    try {
      const response = await axiosInstance.post("/users/", {
        first_name: fname,
        last_name: lname,
        email: email,
        phone_number: `0${phoneNumber.toString()}`,
        password: password,
      });

      if (response.status === 201) {
        alert("Success");
      } else if (response.status === 400) {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log("Error:", error);
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
          onChange={(e) => setFname(e.target.value)}
          sx={classes.input}
        />
        <TextField
          variant="standard"
          label="Last Name"
          required
          fullWidth
          onChange={(e) => setLname(e.target.value)}
          sx={classes.input}
        />
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
          label="Phone number"
          value={phoneNumber}
          required
          fullWidth
          type="number"
          onChange={(e) => {
            if (e.target.value.length <= 9) {
              setPhoneNumber(e.target.value);
            }
            setPhoneNumberError(false);
          }}
          error={phoneNumberError}
          helperText={phoneNumberError && "Invalid phone number format"}
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
          onChange={(e) => setPassword(e.target.value)}
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
          error={passwordError}
          helperText={
            passwordError &&
            "Password must be at least 12 characters, with uppercase, lowercase, digit, and special character"
          }
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
          error={confirmPasswordError}
          helperText={confirmPasswordError && "Passwords do not match"}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordError(false);
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            sx={classes.button}
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
};

export default SignUpForm;
