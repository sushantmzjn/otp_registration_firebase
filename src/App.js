import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { authentication } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
function App() {
  const countryCode = "+977";

  const [phoneNumber, setPhoneNmber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");

  const getRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const requestOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setExpandForm(true);
      getRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
          alert("opt sent");
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error);
          alert("opt not sent");
        });
    } else {
      alert("input 10 digit");
    }
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    let otp = e.target.value;
    setOTP(otp);
    if (otp.length === 6) {
      console.log(otp);
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          // ...
          alert("user registration successful !!!");
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          alert("registration failed");
        });
    }
  };

  return (
    <div className="parent">
      <div className="child">
        <form onSubmit={requestOTP}>
          <h4>Register</h4>
          <div>
            <TextField
              label="enter phone number"
              variant="outlined"
              type="tel"
              id="phoneNumberInput"
              value={phoneNumber}
              onChange={(e) => setPhoneNmber(e.target.value)}
              required
            />
          </div>
          {expandForm === true ? (
            <>
              <div>
                <TextField
                  sx={{ marginY: 2 }}
                  label="OTP"
                  variant="outlined"
                  type="number"
                  id="otpInput"
                  value={OTP}
                  onChange={verifyOTP}
                />
              </div>
            </>
          ) : null}
          {expandForm === false ? (
            <Button variant="contained" type="submit">
              request otp
            </Button>
          ) : null}
          <div id="recaptcha-container"></div>
        </form>
      </div>
    </div>
  );
}

export default App;
