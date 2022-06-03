import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import baseurl from "../config";
import { localStorageKey } from "../utils/localStorageKey";
import { useMutateRoomIssue } from "../queries/mutations";

function RoomIssue() {
  const [reason, setReason] = useState("");
  const [error, setError] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  var errorLength = 0;

  const validate = () => {
    errorLength = 0;
    if (!reason) {
      setError(error => [...error, { type: "Reason", message: "Reason is required" }]);
      errorLength++;
    }
    if (errorLength === 0) {
      return true;
    }
    return false;
  };

  const { mutateAsync: RoomIssueData } = useMutateRoomIssue({
    onSuccess: () => {
      setSuccessMessage("Room Issues submitted successfully");
      setReason("");
    },
    onError: () => { }
  });

  return (
    <div className="bg-room-issue h-screen bg-cover">
      <h1 className="text-3xl font-semibold mt-12 text-center">Room Issue</h1>

      <div className="">

        <h1 className="text-center text-2xl mt-20">Reason</h1>
        <div className="mx-auto text-center mt-4 mb-12 border-2 border-gray-500 py-6 rounded-lg shadow-lg bg-white w-1/2">
          <TextField
            id="reason"
            label="Enter your reason..."
            type="text"
            multiline
            value={reason}
            rows={4}
            onChange={(e) => setReason(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            className="w-11/12"
          />
          {error.length > 0
            ? error.map((item, index) => {
              if (item.type === "Reason") {
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

      <span>
        <p className="text-center mb-4 text-sm text-green-500">{successMessage}</p>
      </span>

      <div className="mx-auto text-center">
        <button
          className="text-white bg-black px-4 py-2 rounded-xl"
          onClick={(e) => {
            e.preventDefault();
            validate() && RoomIssueData({ studentid: localStorage.getItem("id"), message: reason });
          }}
        >
          Submit
        </button>
      </div>
    </div >
  );
}

export default RoomIssue;
