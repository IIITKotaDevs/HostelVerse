import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Otp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("213620");
  const [error, setError] = useState(false);

  const otpLogin = () => {
    axios
      .post("https://hostelverse-aztecs.herokuapp.com/activate", {
        email: "akash1234@yopmail.com",
        code: otp,
      })
      .then(function (response) {
        setError(false);
        navigate("/sign-in");
      })
      .catch(function (error) {
        setError(true);
      });
  };

  const resendCode = () => {
    axios
      .post("https://hostelverse-aztecs.herokuapp.com/resendOTP", {
        email: "akash1234@gmail.com",
      })
      .then(function (response) {
        setError(false);
        navigate("/sign-in");
      })
      .catch(function (error) {
        setError(true);
      });
  };

  return (
    <div className="bg-landing-background bg-cover h-screen grid grid-cols-2 font-roboto">
      <div></div>
      <div className="flex flex-col items-center my-auto text-center">
        <p className="font-bold text-4xl mb-4">HOSTELVERSE 😇</p>
        <p className="text-xl font-medium">Enter OTP</p>
        <input
          type="text"
          className="bg-white w-80 px-4 py-2 rounded-xl my-4"
          placeholder="Enter OTP - XXXXXX"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          type="submit"
          className="px-10 py-2 bg-black text-white font-medium rounded-lg"
          onClick={otpLogin}
        >
          Verify
        </button>
        <button
          type="submit"
          className="px-10 py-2 bg-black text-white font-medium rounded-lg mt-2"
          onClick={resendCode}
        >
          Resend Code
        </button>
        {error ? (
          <p className="text-xl text-red-500 mt-2">Enter correct otp</p>
        ) : null}
      </div>
    </div>
  );
}
