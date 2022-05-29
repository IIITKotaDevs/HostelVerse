import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Rating from "@mui/material/Rating";
import baseurl from "../config";
import axios from "axios";
import { localStorageKey } from "../utils/localStorageKey";

const AllotHostel = () => {
  const [hostelId, setHostelId] = useState("");
  const [batch, setBatch] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log([batch]);
    console.log([hostelId]);

    setMessage("Alloting the hostels...");
    const res = await axios.post(
      `${baseurl}/allotHostel`,
      {
        hostelid: [hostelId],
        batch: [batch],
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      console.log("Alloted successfully");
      setMessage("");
      setSuccessMessage("Hostels alloted successfully!");
    } else {
      console.error("Something went wrong!");
      setMessage("Something went wrong!");
    }

    document.getElementById("hostelid").input = "";
    document.getElementById("batch").input = "";
  };

  return (
    <div className="bg-room-issue h-screen bg-cover">
      <h1 className="text-4xl mt-2 text-center">Allot Hostel</h1>
      <div className="mx-auto text-center w-80">
        <h1 className="text-center mt-12 text-3xl text-red-500">{message}</h1>
        <h1 className="text-center mt-12 text-3xl text-green-500">
          {successMessage}
        </h1>
        <h1 className="text-center text-2xl mt-20 mb-8">Hostel ID</h1>
        <div className="border-2 border-gray-500 py-6 rounded-lg shadow-lg bg-white">
          <TextField
            id="hostelid"
            label="Enter hostel ID"
            type="text"
            onChange={(e) => setHostelId(e.target.value)}
            defaultValue=""
          />
        </div>
      </div>

      <div className="mx-auto text-center w-80">
        <h1 className="text-center text-2xl mt-20 mb-8">Batch</h1>
        <div className="border-2 border-gray-500 py-6 rounded-lg shadow-lg bg-white">
          <TextField
            id="batch"
            label="Enter batch..."
            type="text"
            onChange={(e) => setBatch(e.target.value)}
            defaultValue=""
          />
        </div>
      </div>

      <div className="mx-auto text-center mt-20">
        <button
          className="text-white bg-black px-4 py-2 rounded-xl"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AllotHostel;
