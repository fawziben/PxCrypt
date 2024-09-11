import React, { useEffect, useState } from "react";
import "./OTPFile.css";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { Button } from "@mui/material";
import { axiosInstance } from "../AxiosInstance";
import { useNavigate } from "react-router-dom";

function OTPFile({ email }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate(); // Initialisation du hook de navigation
  const [countdown, setCountdown] = useState(180); // Compte à rebours de 3 minutes
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(countdown - 1), 1000);
      return () => clearInterval(timer);
    } else {
      handleClose();
    }
  }, [countdown]);

  const handleClose = () => {
    setOpen(false);
    navigate("/"); // Rediriger vers la page d'accueil ou une autre page
  };
  const verifyCode = async (email, code) => {
    try {
      const response = await axiosInstance.post("/verify-code", {
        email,
        code,
      });

      console.log(response);

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        console.log(response.data.user_id);
        sessionStorage.setItem("id", response.data.user_id);
        window.electronAPI.loginSuccess(); // Appel d'une fonction depuis l'API Electron
        navigate("dashboard");
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleChange = (element, index) => {
    // Allow only alphanumeric characters
    if (!/^[a-zA-Z0-9]$/.test(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = () => {
    verifyCode(email, otp.join(""));
  };

  return (
    <div className="otp-container">
      <div>
        <MarkEmailReadIcon
          sx={{ width: "120px", height: "120px", color: "#27535E" }}
        ></MarkEmailReadIcon>
      </div>
      <h2 style={{ color: "#27535E" }}>OTP Verification</h2>
      <p>Please check your email</p>
      <p style={{ color: "#bfbdb6", fontSize: "15px" }}>
        Please check your email we have sent a code to{" "}
      </p>
      <br />
      <div className="otp-inputs">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            name="otp"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
      <div style={{ marginTop: "50px" }}>
        <Button
          variant="outlined"
          onClick={handleSubmit}
          sx={{ width: "200px", height: "50px" }}
        >
          Verify
        </Button>
        <div style={{ marginTop: "10px", color: "#27535E" }}>
          <p>
            Time remaining: {Math.floor(countdown / 60)}:
            {String(countdown % 60).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OTPFile;
