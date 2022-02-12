import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="bg-landing-background bg-cover h-screen grid grid-cols-2 font-roboto">
      <div></div>
      <div className="flex flex-col items-center my-auto text-center">
        <p className="font-bold text-4xl mb-4">HOSTELVERSE 😇</p>
        <p className="text-xl font-medium">Sign Up</p>
        <div className="flex flex-col">
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-xl my-4"
            placeholder="Name"
          />
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
            placeholder="Email"
          />
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
            placeholder="Password"
          />
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
            placeholder="Confirm Password"
          />
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
            placeholder="College Id"
          />
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
            placeholder="Gender"
          />
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
            placeholder="Contact No."
          />
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
            placeholder="Location"
          />
        </div>
        <button
          type="submit"
          className="px-10 py-2 bg-black text-white font-medium rounded-lg"
          onClick={() => navigate("/sign-in")}
        >
          Submit
        </button>
        <p className="mt-2 ">
          Already have an Account ?
          <p
            className="cursor-pointer underline text-blue-700"
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </p>
        </p>
      </div>
    </div>
  );
}
