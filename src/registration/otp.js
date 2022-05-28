import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseurl from "../config";
import { useLocation } from "react-router-dom";

export default function Otp(props) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const { state } = useLocation();

  const otpLogin = () => {
    axios
      .post(
        `${baseurl}/student/verifyemail`,
        {
          email: state.email,
          code: +otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        setError("");
        navigate("/sign-in");
      })
      .catch(function (error) {
        console.log(error);
        setError(error.message);
      });
  };

  const resendCode = () => {
    axios
      .post(`${baseurl}/resendOTP`, {
        email: props.email,
      })
      .then(function (response) {
        setError("");
        navigate("/sign-in");
      })
      .catch(function (error) {
        setError(error.message);
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
        {error ? <p className="text-xl text-red-500 mt-2">{error}</p> : null}
      </div>
    </div>
  );
}
