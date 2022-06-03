import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutateVerifyEmail } from "../queries/mutations";

export default function Otp(props) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState([]);
  const [resend, setResend] = useState(false);

  const baseUrl = "https://hostelverse-backend.azurewebsites.net/api";
  const { state } = useLocation();

  const resendOTP = async () => {
    const response = await fetch(baseUrl + "/resendOTP" + `?email=${state.email}`, {
      method: "GET",
    });
    const data = await response.json();
    if (data.success) {
      setResend(!resend);
    }
  };

  useEffect(() => {
    resendOTP();
  }, [resend]);

  var errorLength = 0;

  const validate = () => {
    errorLength = 0;
    setError([]);
    if (otp.length === 0) {
      setError((error) => [
        ...error,
        { type: "Reason", message: "OTP is required" },
      ]);
      errorLength++;
    }
    if (otp.length > 0 && otp.length < 6) {
      setError((error) => [
        ...error,
        { type: "Reason", message: "OTP should be 6 digits" },
      ]);
      errorLength++;
    }
    if (errorLength === 0) {
      return true;
    }
    return false;
  };

  const { mutateAsync: verifyEmailData } = useMutateVerifyEmail({
    onSuccess: (data) => {
      if (data.message === "Student verified successfully! Your account is now activated.") {
        navigate("/sign-in");
      }
      else {
        setError((error) => [
          ...error,
          { type: "Reason", message: data.message },
        ]);
      }
      // navigate("/sign-in");
    },
    onError: (data) => {
      console.log(data);
      // setError(data);
    }
  });



  return (
    <div className="bg-landing-background bg-cover h-screen grid grid-cols-2 font-roboto" >
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
        {error.length > 0
          ? error.map((item, index) => {
            if (item.type === "Reason") {
              return (
                <span className="text-red-500 -mt-2 mb-2 text-xs" key={index}>
                  <p>
                    {item.message}
                  </p>
                </span>
              );
            }
          })
          : null}
        <button
          className="px-10 py-2 bg-black text-white font-medium rounded-lg"
          onClick={(e) => {
            e.preventDefault();
            validate() && verifyEmailData({
              email: state.email,
              code: +otp,
            })
          }}
        >
          Verify
        </button>
        <button
          className="px-10 py-2 bg-black text-white font-medium rounded-lg mt-2"
          onClick={() => { setResend(!resend); }}
        >
          Resend Code
        </button>
        {/* {error ? <p className="text-xl text-red-500 mt-2">{error}</p> : null} */}
      </div>
    </div >
  );
}
