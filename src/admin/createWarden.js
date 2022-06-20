import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useMutateCreateWarden } from "../queries/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import Leave from "../assets/img/leave.jpg";

function CreateWarden() {
  const [hostelId, setHostelId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wardenId, setWardenId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState([]);

  const { mutateAsync: CreateWardenData } = useMutateCreateWarden({
    onSuccess: () => {
      setSuccess("Warden created successfully");
      setHostelId("");
      setName("");
      setPassword("");
      setConfirmPassword("");
      setWardenId("");
      setEmail("");
      setPhone("");
    },
    onError: () => { },
  });

  var errorLength = 0;

  const validate = () => {
    errorLength = 0;
    setError([]);
    if (!hostelId) {
      setError(error => [...error, { type: "hostelId", message: "Hostel Id is required" }]);
      errorLength++;
    }
    if (!name) {
      setError(error => [...error, { type: "name", message: "Name is required" }]);
      errorLength++;
    }
    if (!password) {
      setError((error) => [...error, { type: "password", message: "Password is required" }]);
      errorLength++;
    }
    if (password.length > 0 && password.length < 8) {
      setError((error) => [...error, { type: "password", message: "Password must be atleast 8 characters" }]);
      errorLength++;
    }
    if (password.length > 0 && password.match(/[a-z]/g) === null) {
      setError((error) => [...error, { type: "password", message: "Password must contain atleast one lowercase letter" }]);
      errorLength++;
    }
    if (password.length > 0 && password.match(/[A-Z]/g) === null) {
      setError((error) => [...error, { type: "password", message: "Password must contain atleast one uppercase letter" }]);
      errorLength++;
    }
    if (password.length > 0 && password.match(/[0-9]/g) === null) {
      setError((error) => [...error, { type: "password", message: "Password must contain atleast one number" }]);
      errorLength++;
    }
    if (password.length > 0 && password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) === null) {
      setError((error) => [...error, { type: "password", message: "Password must contain atleast one special character" }]);
      errorLength++;
    }
    if (password.length > 0 && confirmPassword === "") {
      setError((error) => [...error, { type: "confirmPassword", message: "Confirm Password is required" }]);
      errorLength++;
    }
    if (password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword) {
      setError((error) => [...error, { type: "confirmPassword", message: "Password and Confirm Password must be same" }]);
      errorLength++;
    }
    if (!wardenId) {
      setError(error => [...error, { type: "wardenId", message: "Warden Id is required" }]);
      errorLength++;
    }
    if (!email) {
      setError(error => [...error, { type: "email", message: "Email is required" }]);
      errorLength++;
    }
    if (email.length > 0 && email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null) {
      setError((error) => [...error, { type: "email", message: "Invalid Email" }]);
      errorLength++;
    }
    if (!phone) {
      setError(error => [...error, { type: "phone", message: "Phone is required" }]);
      errorLength++;
    }
    if (phone.length > 0 && phone.length !== 10) {
      setError((error) => [
        ...error,
        { type: "phone", message: "Phone must be only of 10 digits" },
      ]);
      errorLength++;
    }
    if (phone.length > 0 && phone.match(/^[0-9]+$/) === null) {
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
  }

  useEffect(() => {
    setTimeout(() => {
      setSuccess("");
    }, 5000);
  }, [success]);

  return (
    <div className="flex">
      <div className="w-3/5 my-auto">
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 px-4 py-3 rounded-full border-4 border-gray-300 shadow-lg">
            <FontAwesomeIcon icon={solid("user")} size="2x" className="text-emerald-500 rounded-full" />
          </div>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">Create Warden</h1>
        </div>
        <div className="grid grid-cols-2 mx-auto w-3/4 gap-x-4 gap-y-4 my-4">
          <div>
            <TextField
              id="email"
              label="Warden Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              size="small"
              required
              className="w-full shadow"
            />
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
          <div>
            <TextField
              id="name"
              label="Warden Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              size="small"
              required
              className="w-full shadow"
            />
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
          </div>
          <div>
            <TextField
              id="phone"
              label="Warden Phone"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              variant="outlined"
              size="small"
              required
              className="w-full shadow"
            />
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
          </div>
          <div>
            <TextField
              id="wardenid"
              label="Warden Id"
              type="text"
              onChange={(e) => setWardenId(e.target.value)}
              variant="outlined"
              size="small"
              required
              className="w-full shadow"
            />
            {error.length > 0
              ? error.map((item, index) => {
                if (item.type === "wardenId") {
                  return (
                    <p className="text-red-500 text-xs" key={index}>
                      {item.message}
                    </p>
                  );
                }
              })
              : null}
          </div>
          <div>
            <TextField
              id="password"
              label="Warden Password"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              size="small"
              required
              className="w-full shadow"
            />
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
          <div>
            <TextField
              id="confirm{assword"
              label="Confirm Password"
              type="text"
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              size="small"
              required
              className="w-full shadow"
            />
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
          </div>
          <div>
            <TextField
              id="hostelid"
              label="Hostel Id"
              type="text"
              onChange={(e) => setHostelId(e.target.value)}
              variant="outlined"
              size="small"
              required
              className="w-full shadow"
            />
            {error.length > 0
              ? error.map((item, index) => {
                if (item.type === "hostelId") {
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
        <h1 className="text-center font-semibold mb-2 text-sm text-green-500 transition-all">{success}</h1>
        <div className="text-center">
          <button
            className="text-white bg-emerald-500 hover:bg-emerald-700 transition-all font-medium shadow-lg hover:shadow-none px-4 py-2 rounded-lg"
            onClick={() => {
              validate() && CreateWardenData({
                "wardenid": wardenId,
                "email": email,
                "password": password,
                "name": name,
                "contactno": phone,
                "hostelid": hostelId,
              });
            }}
          >
            Create
          </button>
        </div>
      </div>
      <div className="w-2/5 bg-no-repeat bg-cover bg-center h-screen" style={{ backgroundImage: `url(${Leave})` }} />
    </div >
  );
}

export default CreateWarden;
