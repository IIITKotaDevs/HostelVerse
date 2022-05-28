import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { localStorageKey } from "../utils/localStorageKey";
import baseurl from "../config";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("student");
  const [error, setError] = useState(false);

  const userSignIn = async () => {
    await axios
      .post(
        `${baseurl}/login`,
        {
          email: email,
          password: password,
          role: type,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem(
            localStorageKey.name,
            response.data.profile.name
          );
          localStorage.setItem(localStorageKey.jwtToken, response.data.token);
          localStorage.setItem(
            localStorageKey.contactNo,
            response.data.profile.contactno
          );
          localStorage.setItem(
            localStorageKey.role,
            response.data.profile.role
          );
          localStorage.setItem(
            localStorageKey.email,
            response.data.profile.email
          );

          if (response?.data?.profile?.role === "student") {
            localStorage.setItem(
              localStorageKey.gender,
              response.data.profile.gender
            );
            localStorage.setItem(
              localStorageKey.roomId,
              response.data.profile.roomid
            );
            localStorage.setItem(
              localStorageKey.hostelId,
              response.data.profile.hostelid
            );
            localStorage.setItem(
              localStorageKey.id,
              response.data.profile.studentid
            );
            navigate("/student/dashboard");
          } else if (response?.status === 200 && type === "warden") {
            localStorage.setItem(
              localStorageKey.wardenid,
              response.data.profile.wardenid
            );
            navigate("/warden/student-list");
          } else if (response?.status === 200 && type === "admin") {
            navigate("/admin/dashboard");
          }
        }
      })
      .catch(function (error) {
        setError(true);
      });
  };

  // Auto Login
  useEffect(() => {
    if (localStorage.getItem(localStorageKey.jwtToken)) {
      if (localStorage.getItem(localStorageKey.role) === "student") {
        navigate("/student/dashboard");
      } else if (localStorage.getItem(localStorageKey.role) === "warden") {
        navigate("/warden/student-list");
      } else if (localStorage.getItem(localStorageKey.role) === "admin") {
        navigate("/admin/dashboard");
      }
    }
  }, []);

  const isValidated = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validate = () => {
    setError(false);
    if (isValidated(email)) {
      if (password.length > 5) {
        userSignIn();
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }

    reset();
  };

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-landing-background bg-cover h-screen grid grid-cols-2 font-roboto">
      <div></div>
      <div className="flex flex-col items-center my-auto text-center">
        <p className="font-bold text-4xl mb-4">HOSTELVERSE 😇</p>
        <p className="text-xl font-medium">Sign In</p>
        <div className="flex flex-col">
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-xl my-4"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex-row pb-4 w-80 flex justify-evenly">
          <div className="align-middle">
            <input
              type="radio"
              className="bg-white mr-2"
              checked={type === "student"}
              onChange={() => setType("student")}
            />
            <label>Student</label>
          </div>
          <div className="align-middle">
            <input
              type="radio"
              className="bg-white mr-2"
              checked={type === "warden"}
              onChange={() => setType("warden")}
            />
            <label>Warden</label>
          </div>
          <div className="align-middle">
            <input
              type="radio"
              className="bg-white mr-2"
              checked={type === "admin"}
              onChange={() => setType("admin")}
            />
            <label>Admin</label>
          </div>
        </div>
        <button
          type="submit"
          className="px-10 py-2 bg-black text-white font-medium rounded-lg"
          onClick={validate}
        >
          Submit
        </button>
        {error ? (
          <p className="text-xl text-red-500">Something went wrong</p>
        ) : null}
        <p className="mt-2 ">Don't have an Account ?</p>
        <p
          className="cursor-pointer underline text-blue-700"
          onClick={() => navigate("/sign-up")}
        >
          Sign Up
        </p>
      </div>
    </div>
  );
}
