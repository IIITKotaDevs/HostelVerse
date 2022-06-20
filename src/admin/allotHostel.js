import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Rating from "@mui/material/Rating";
import baseurl from "../config";
import axios from "axios";
import { localStorageKey } from "../utils/localStorageKey";
import {useMutateAllotHostel} from '../queries/mutations';

const AllotHostel = () => {
  const [hostelId, setHostelId] = useState("");
  const [batch, setBatch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { mutateAsync: allotHostel } = useMutateAllotHostel({
    onSuccess: () => {
      window.location.reload();
    },
    onError: () => {},
  });

  return (
    <div className="bg-room-issue h-screen bg-cover">
      <h1 className="text-4xl mt-2 text-center">Allot Hostel</h1>
      <div className="mx-auto text-center w-80">
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
          onClick={() => {allotHostel({
          	hostelid: hostelId,
          	batch: batch,
          })}}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AllotHostel;
