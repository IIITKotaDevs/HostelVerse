import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormData from "form-data";
import baseurl from "../config";
import axios from "axios";

function CreateWarden() {
  const [hostel, setHostel] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [warden, setWarden] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${baseurl}/createWarden`,
      {
        email: email,
        name: name,
        hostelid: hostel,
        contactno: phone,
        password: password,
        wardenid: warden,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken")
            ? `Bearer ${localStorage.getItem("jwtToken")}`
            : "",
          "Content-type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      console.log("Submitted successfully");
      setHostel("");
      setName("");
      setPassword("");
      setWarden("");
      setEmail("");
      setPhone("");
      setSuccess("Warden created successfully!");
    } else {
      console.error("Something went wrong!");
    }

    document.getElementById("email").value = "";
    document.getElementById("name").value = "";
    document.getElementById("hostelid").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("password").value = "";
    document.getElementById("wardenid").value = "";
  };
  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handleHostelChange = (e) => {
    e.preventDefault();
    setHostel(e.target.value);
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const handlePhoneChange = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
  };
  const handleWardenChange = (e) => {
    e.preventDefault();
    setWarden(e.target.value);
  };

  return (
    <div className="">
      <h1 className="text-4xl mt-2 text-center">Create Warden</h1>
      {success && (
        <h1 className="text-center mt-12 text-3xl text-green-500">{success}</h1>
      )}
      <div className="grid grid-cols-3">
        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">Email</h1>
          <TextField
            id="email"
            label="Enter warden email..."
            type="email"
            multiline
            onChange={handleEmailChange}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">Name</h1>
          <TextField
            id="name"
            label="Enter warden name..."
            type="text"
            multiline
            onChange={handleNameChange}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">Hostel ID</h1>
          <TextField
            id="hostelid"
            label="Enter warden hostel..."
            type="text"
            multiline
            onChange={handleHostelChange}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">Phone</h1>
          <TextField
            id="phone"
            label="Enter warden phone..."
            type="text"
            multiline
            onChange={handlePhoneChange}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">Password</h1>
          <TextField
            id="password"
            label="Enter password..."
            type="text"
            multiline
            onChange={handlePasswordChange}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">Warden ID</h1>
          <TextField
            id="wardenid"
            label="Enter warden ID..."
            type="text"
            multiline
            onChange={handleWardenChange}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>

      <div className="mx-auto text-center mt-20">
        <button
          className="text-white bg-black px-4 py-2 rounded-3xl"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateWarden;
