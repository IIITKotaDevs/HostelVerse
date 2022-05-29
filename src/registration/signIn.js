import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import axios from "axios";
import { localStorageKey } from "../utils/localStorageKey";
import baseurl from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState({ name: "Select Profession" });
  const [error, setError] = useState([{}]);
  const [eyePassword, setEyePassword] = useState(false);

  const userSignIn = async () => {
    await axios
      .post(
        `${baseurl}/login`,
        {
          email: email,
          password: password,
          role: type.name.toLowerCase(),
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
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
              localStorageKey.type,
              response.data.profile.type
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
          } else if (
            response?.status === 200 &&
            type.name.toLowerCase() === "warden"
          ) {
            localStorage.setItem(
              localStorageKey.id,
              response.data.profile.wardenid
            );
            navigate("/warden/student-list");
          } else if (
            response?.status === 200 &&
            type.name.toLowerCase() === "admin"
          ) {
            navigate("/admin/dashboard");
          }
        }
      })
      .catch(function (error) {
        setError((error) => [
          ...error,
          { type: "error", message: "Invalid Credentials" },
        ]);
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

  const validate = () => {
    setError([]);
    if (email === "") {
      setError((error) => [
        ...error,
        { type: "email", message: "Email is required" },
      ]);
    }
    if (
      email.length > 0 &&
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) === null
    ) {
      setError((error) => [
        ...error,
        { type: "email", message: "Email is invalid" },
      ]);
    }
    if (password === "") {
      setError((error) => [
        ...error,
        { type: "password", message: "Password is required" },
      ]);
    }
    if (password.length > 0 && password.length < 8) {
      setError((error) => [
        ...error,
        { type: "password", message: "Password must be atleast 8 characters" },
      ]);
    }
    if (password.length > 0 && password.match(/[a-z]/g) === null) {
      setError((error) => [
        ...error,
        {
          type: "password",
          message: "Password must contain atleast one lowercase letter",
        },
      ]);
    }
    if (password.length > 0 && password.match(/[A-Z]/g) === null) {
      setError((error) => [
        ...error,
        {
          type: "password",
          message: "Password must contain atleast one uppercase letter",
        },
      ]);
    }
    if (password.length > 0 && password.match(/[0-9]/g) === null) {
      setError((error) => [
        ...error,
        {
          type: "password",
          message: "Password must contain atleast one number",
        },
      ]);
    }
    if (
      password.length > 0 &&
      password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) === null
    ) {
      setError((error) => [
        ...error,
        {
          type: "password",
          message: "Password must contain atleast one special character",
        },
      ]);
    }
    if (type.name === "Select Profession") {
      setError((error) => [
        ...error,
        { type: "type", message: "Gender is required" },
      ]);
    }
  };

  const reset = () => {
    setEmail("");
    setPassword("");
  };
  if (error.length === 0) {
    userSignIn();
  }

  const typeOptions = [
    { name: "Student" },
    { name: "Warden" },
    { name: "Admin" },
  ];

  return (
    <div className="bg-landing-background bg-cover h-screen grid grid-cols-2 font-roboto">
      <div></div>
      <div className="flex flex-col items-center my-auto text-center">
        <p className="font-bold text-4xl mb-4">HOSTELVERSE 😇</p>
        <p className="text-xl font-medium">Sign In</p>
        <div className="flex flex-col">
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-xl my-4 text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="-mt-2 mb-1 text-left">
            {error.length > 0
              ? error.map((item, index) => {
                  if (item.type === "email") {
                    return (
                      <p className="text-red-500 text-xs" key={index}>
                        {item.message}
                      </p>
                    );
                  }
                })
              : null}
          </div>
          <div className="bg-white w-80 rounded-lg mb-4 shadow-lg text-sm flex justify-between items-center gap-4">
            <input
              type={eyePassword ? "text" : "password"}
              className="py-2 px-4 rounded-lg w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={eyePassword ? solid("eye") : solid("eye-slash")}
              className="h-3.5 text-gray-800 pr-4"
              onClick={() => setEyePassword(!eyePassword)}
            />
          </div>
          <div className="-mt-2 mb-1 text-left">
            {error.length > 0
              ? error.map((item, index) => {
                  if (item.type === "password") {
                    return (
                      <p className="text-red-500 text-xs" key={index}>
                        {item.message}
                      </p>
                    );
                  }
                })
              : null}
          </div>
          <div className="bg-white w-80 rounded-lg mb-4 text-sm">
            <Listbox value={type} onChange={setType}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-4 pr-10 text-left shadow-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                  <span className="block truncate">{type.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <FontAwesomeIcon
                      icon={solid("angle-down")}
                      className="w-3.5 h-3.5"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {typeOptions.map((type, genderIdx) => (
                      <Listbox.Option
                        key={genderIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-4 pr-4 ${
                            active
                              ? "bg-amber-100 text-primary"
                              : "text-gray-900"
                          }`
                        }
                        value={type}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {type.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary2">
                                <FontAwesomeIcon
                                  icon={solid("check")}
                                  className="w-3.5 h-3.5"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className="-mt-2 mb-1 text-left">
            {error.length > 0
              ? error.map((item, index) => {
                  if (item.type === "type") {
                    return (
                      <p className="text-red-500 text-xs" key={index}>
                        {item.message}
                      </p>
                    );
                  }
                })
              : null}
          </div>
        </div>

        <button
          type="submit"
          className="px-10 py-2 bg-black text-white font-medium rounded-lg"
          onClick={(e) => {
            validate();
          }}
        >
          Submit
        </button>
        <span className="mt-2">
          {error.length > 0
            ? error.map((item, index) => {
                if (item.type === "error") {
                  return (
                    <p className="text-red-500 text-xs" key={index}>
                      {item.message}
                    </p>
                  );
                }
              })
            : null}
        </span>
        <div className="flex gap-1 text-xs mt-2">
          <p className="">Don't have an Account ?</p>
          <p
            className="cursor-pointer underline text-blue-700"
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </p>
        </div>
      </div>
    </div>
  );
}
