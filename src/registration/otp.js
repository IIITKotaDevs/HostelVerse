import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Otp() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
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
                    onClick={() => navigate("/sign-in")}
                >
                    Verify
                </button>
            </div>
        </div>
    );
}