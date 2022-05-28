import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import baseurl from "../config";
import axios from "axios";

function CreateWarden() {
  const [hostel, setHostel] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [warden, setWarden] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [percentage, setPercentage] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${baseurl}/admin/createWardenAccount`,
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

    setHostel("");
    setName("");
    setPassword("");
    setWarden("");
    setEmail("");
    setPhone("");

    if (res.status === 200) {
      console.log("Submitted successfully");
    } else {
      console.error("Something went wrong!");
    }
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
      <div className="grid grid-cols-3">
        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">Email</h1>
          <TextField
            id="email"
            label="Enter your email..."
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
            label="Enter your name..."
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
            label="Enter your hostel..."
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
            label="Enter your phone..."
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
            label="Enter your password..."
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
            id="warden"
            label="Enter your warden..."
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
