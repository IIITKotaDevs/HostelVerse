import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Listbox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { localStorageKey } from "../utils/localStorageKey";
import { useMutateSignUp } from "../queries/mutations";

const genderType = [{ name: "Male" }, { name: "Female" }, { name: "Other" }];

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState({ name: "Select Gender" });
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [eyePassword, setEyePassword] = useState(false);
  const [eyeConfirmPassword, setEyeConfirmPassword] = useState(false);
  const [error, setError] = useState([]);

  var errorLength = 0;

  const { mutateAsync: signUpData } = useMutateSignUp({
    onSuccess: (data) => {
      // Console the response from the server
      if (data.message !== "Student created successfully!") {
        setError(error => [...error, { type: "undefined", message: data.message }]);
        errorLength++;
        setEmail("");
      } else {
        navigate("/otp", { state: { email: email } });
      }
    },
    onError: (data) => {
      setError(error => [...error, { type: "undefined", message: data.message }]);
      errorLength++;
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setId("");
      setGender({ name: "Select Gender" });
      setPhone("");
    }
  });

  const validate = () => {
    errorLength = 0;
    setError([]);
    if (name === "") {
      setError((error) => [
        ...error,
        { type: "name", message: "Name is required" },
      ]);
      errorLength++;
    }
    if (name.length > 0 && name.length < 3) {
      setError((error) => [
        ...error,
        { type: "name", message: "Name must be atleast 3 characters" },
      ]);
      errorLength++;
    }
    if (name.length > 0 && name.length > 30) {
      setError((error) => [
        ...error,
        { type: "name", message: "Name must be less than 30 characters" },
      ]);
      errorLength++;
    }
    if (email === "") {
      setError((error) => [
        ...error,
        { type: "email", message: "Email is required" },
      ]);
      errorLength++;
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
      errorLength++;
    }
    if (password === "") {
      setError((error) => [
        ...error,
        { type: "password", message: "Password is required" },
      ]);
      errorLength++;
    }
    if (password.length > 0 && password.length < 8) {
      setError((error) => [
        ...error,
        { type: "password", message: "Password must be atleast 8 characters" },
      ]);
      errorLength++;
    }
    if (password.length > 0 && password.match(/[a-z]/g) === null) {
      setError((error) => [
        ...error,
        {
          type: "password",
          message: "Password must contain atleast one lowercase letter",
        },
      ]);
      errorLength++;
    }
    if (password.length > 0 && password.match(/[A-Z]/g) === null) {
      setError((error) => [
        ...error,
        {
          type: "password",
          message: "Password must contain atleast one uppercase letter",
        },
      ]);
      errorLength++;
    }
    if (password.length > 0 && password.match(/[0-9]/g) === null) {
      setError((error) => [
        ...error,
        {
          type: "password",
          message: "Password must contain atleast one number",
        },
      ]);
      errorLength++;
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
      errorLength++;
    }
    if (password.length > 0 && confirmPassword === "") {
      setError((error) => [
        ...error,
        { type: "confirmPassword", message: "Confirm Password is required" },
      ]);
      errorLength++;
    }
    if (
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password !== confirmPassword
    ) {
      setError((error) => [
        ...error,
        {
          type: "confirmPassword",
          message: "Password and Confirm Password must be same",
        },
      ]);
      errorLength++;
    }
    if (id === "") {
      setError((error) => [
        ...error,
        { type: "id", message: "ID is required" },
      ]);
      errorLength++;
    }
    if (gender.name === "Select Gender") {
      setError((error) => [
        ...error,
        { type: "gender", message: "Gender is required" },
      ]);
      errorLength++;
    }
    if (phone === "") {
      setError((error) => [
        ...error,
        { type: "phone", message: "Phone is required" },
      ]);
      errorLength++;
    }
    if (phone.length > 0 && phone.length !== 10) {
      setError((error) => [
        ...error,
        { type: "phone", message: "Phone must be only of 10 digits" },
      ]);
      errorLength++;
    }
    if (phone.length > 0 && phone.match(/[0-9]/g) === null) {
      setError((error) => [
        ...error,
        { type: "phone", message: "Phone must contain only numbers" },
      ]);
      errorLength++;
    }

    if (errorLength === 0) {
      return true;
    }
    return false;
  };

  return (
    <div className="bg-landing-background bg-cover h-screen grid grid-cols-2 font-roboto">
      <div></div>
      <div className="flex flex-col items-center my-auto text-center">
        <p className="font-bold text-4xl mb-2">HOSTELVERSE 😇</p>
        <p className="text-xl font-medium">Sign Up</p>
        <div className="flex flex-col">
          <input
            type="text"
            className={`bg-white w-80 px-4 py-2 rounded-lg my-4 shadow-lg text-sm`}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="-mt-2 mb-1 text-left">
            {error.length > 0
              ? error.map((item, index) => {
                if (item.type === "name") {
                  return (
                    <p className="text-red-500 text-xs" key={index}>
                      {item.message}
                    </p>
                  );
                }
              })
              : null}
          </span>
          <input
            type="email"
            className="bg-white w-80 px-4 py-2 rounded-lg mb-4 shadow-lg text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="-mt-2 mb-1 text-left">
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
          </span>
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
          <span className="-mt-2 mb-1 text-left">
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
          </span>
          <div className="bg-white w-80 rounded-lg mb-4 shadow-lg text-sm flex justify-between items-center gap-4">
            <input
              type={eyeConfirmPassword ? "text" : "password"}
              className="py-2 px-4 rounded-lg w-full"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={eyeConfirmPassword ? solid("eye") : solid("eye-slash")}
              className="h-3.5 text-gray-800 pr-4"
              onClick={() => setEyeConfirmPassword(!eyeConfirmPassword)}
            />
          </div>
          <span className="-mt-2 mb-1 text-left">
            {error.length > 0
              ? error.map((item, index) => {
                if (item.type === "confirmPassword") {
                  return (
                    <p className="text-red-500 text-xs" key={index}>
                      {item.message}
                    </p>
                  );
                }
              })
              : null}
          </span>
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-lg mb-4 shadow-lg text-sm"
            placeholder="College Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <span className="-mt-2 mb-1 text-left">
            {error.length > 0
              ? error.map((item, index) => {
                if (item.type === "id") {
                  return (
                    <p className="text-red-500 text-xs" key={index}>
                      {item.message}
                    </p>
                  );
                }
              })
              : null}
          </span>
          <div className="bg-white w-80 rounded-lg mb-4 text-sm">
            <Listbox value={gender} onChange={setGender}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-4 pr-10 text-left shadow-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                  <span className="block truncate">{gender.name}</span>
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
                    {genderType.map((gender, genderIdx) => (
                      <Listbox.Option
                        key={genderIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-4 pr-4 ${active
                            ? "bg-amber-100 text-primary"
                            : "text-gray-900"
                          }`
                        }
                        value={gender}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? "font-medium" : "font-normal"
                                }`}
                            >
                              {gender.name}
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
          <span className="-mt-2 mb-1 text-left">
            {error.length > 0
              ? error.map((item, index) => {
                if (item.type === "gender") {
                  return (
                    <p className="text-red-500 text-xs" key={index}>
                      {item.message}
                    </p>
                  );
                }
              })
              : null}
          </span>
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-lg mb-4 shadow-lg text-sm"
            placeholder="Contact No."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <span className="-mt-2 mb-1 text-left">
            {error.length > 0
              ? error.map((item, index) => {
                if (item.type === "phone") {
                  return (
                    <p className="text-red-500 text-xs" key={index}>
                      {item.message}
                    </p>
                  );
                }
              })
              : null}
          </span>
        </div>
        <span className="mb-1 text-left">
          {error.length > 0
            ? error.map((item, index) => {
              if (item.type === "undefined") {
                return (
                  <p className="text-red-500 text-xs" key={index}>
                    {item.message}
                  </p>
                );
              }
            })
            : null}
        </span>
        <button
          className="px-10 py-2 bg-gray-800 hover:bg-black text-white font-medium rounded-lg shadow-lg hover:shadow-none"
          onClick={(e) => {
            e.preventDefault();
            validate() && signUpData({
              email: email,
              password: password,
              studentid: id,
              name: name,
              gender: gender.name,
              contactno: phone,
              location: localStorage.getItem(localStorageKey.location)
            })
          }}
        >
          Submit
        </button>
        <div className="flex gap-1 items-end text-xs">
          <p className="mt-2 ">Already have an Account ?</p>
          <p
            className="cursor-pointer underline text-blue-700"
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </p>
        </div>
      </div>
    </div>
  );
}
