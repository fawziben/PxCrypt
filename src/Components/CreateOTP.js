import React, { useState } from "react";
import "./OTPFile.css";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { Button } from "@mui/material";
import { axiosInstance } from "../AxiosInstance";
import { useNavigate } from "react-router-dom";

function CreateOTP({ user }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const verifyCode = async (code) => {
    try {
      alert(user.phoneNumber);
      const response = await axiosInstance.post("/users/", {
        user: {
          first_name: user.fname,
          last_name: user.lname,
          email: user.email,
          phone_number: user.phoneNumber,
          password: user.password,
        },
        code: code,
      });

      console.log(response);

      if (response.status == 201) {
        console.log("User created Successfully");
        if (!response.data.state) {
          console.log(
            "This email is not allowed, please contact admin to activate your account"
          );
        }
      } else {
        console.log("Invalid OTP");
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
    verifyCode(otp.join(""));
    alert("Entered OTP is: " + otp.join(""));
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
      </div>
    </div>
  );
}

export default CreateOTP;
