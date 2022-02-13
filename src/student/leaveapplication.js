import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import baseurl from "../config";
import axios from "axios";

function LeaveApplication() {
  const [startDate, setStartDate] = useState("2022-02-12");
  const [endDate, setEndDate] = useState("2022-02-13");
  const [reason, setReason] = useState("");
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${baseurl}/student/createLeaveApplication`,
      {
        studentid: localStorage.getItem("id"),
        message: reason,
        date_to: endDate,
        date_from: startDate,
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
      console.log("Your application is submitted successfully");
    } else {
      console.log("Something went wrong!");
    }
  };
  return (
    <div className="bg-leave-application bg-cover h-screen">
      <h1 className="text-4xl mt-2 text-center">Leave Application</h1>

      <div className="mx-24 mt-4 grid md:grid-cols-2 grid-cols-1 mt-20">
        <div className="col-span-1 mx-auto">
          <TextField
            id="date"
            label="Choose starting date"
            type="date"
            onChange={handleStartDateChange}
            defaultValue="2022-02-12"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="col-span-1 mx-auto">
          <TextField
            id="date"
            label="Choose ending date"
            type="date"
            onChange={handleEndDateChange}
            defaultValue="2022-02-13"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>

      <div className="">
        <h1 className="text-center text-2xl mt-20">Reason</h1>
        <div className="mx-auto text-center mt-12 w-80 border-2 border-gray-500 py-6 rounded-lg shadow-lg bg-white">
          <TextField
            id="date"
            label="Enter your reason..."
            type="text"
            multiline
            rows={4}
            onChange={handleReasonChange}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
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
}

export default LeaveApplication;
