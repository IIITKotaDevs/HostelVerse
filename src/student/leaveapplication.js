import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useMutateLeaveApplication } from "../queries/mutations";

function LeaveApplication() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  var errorLength = 0;

  const validate = () => {
    errorLength = 0;
    if (!startDate) {
      setError(error => [...error, { type: "StartDate", message: "Start Date is required" }]);
      errorLength++;
    }
    // Check if start date is less than current date
    if (startDate.length === 10 && new Date(startDate) <= new Date()) {
      setError(error => [...error, { type: "StartDate", message: "Start Date must not be less than current date" }]);
      errorLength++;
    }
    if (!endDate) {
      setError(error => [...error, { type: "EndDate", message: "End Date is required" }]);
      errorLength++;
    }
    // Check if end date is less than current date
    if (endDate.length === 10 && new Date(endDate) <= new Date()) {
      setError(error => [...error, { type: "EndDate", message: "End Date must not be less than current date" }]);
      errorLength++;
    }
    // Check if start date is greater than end date
    if (startDate.length === 10 && endDate.length === 10 && new Date(startDate) >= new Date(endDate)) {
      setError(error => [...error, { type: "EndDate", message: "End Date must be greater or equal to Start Date" }]);
      errorLength++;
    }
    if (!reason) {
      setError(error => [...error, { type: "Reason", message: "Reason is required" }]);
      errorLength++;
    }
    if (errorLength === 0) {
      return true;
    }
    return false;
  };

  const { mutateAsync: LeaveApplicationData } = useMutateLeaveApplication({
    onSuccess: () => {
      setSuccessMessage("Leave Application submitted successfully");
      setStartDate("");
      setEndDate("");
      setReason("");
    },
    onError: () => { }
  });

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  }, [successMessage.length > 0]);

  return (
    <div className="bg-leave-application bg-cover h-screen">
      <h1 className="text-3xl font-semibold mt-12 text-center">Leave Application</h1>

      <div className="mx-24 mt-20 flex justify-around">
        <div>
          <TextField
            id="startdate"
            label="Choose Starting Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            className="w-64"
          />
          {error.length > 0
            ? error.map((item, index) => {
              if (item.type === "StartDate") {
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
            id="enddate"
            label="Choose Ending Date"
            value={endDate}
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            className="w-64"
          />
          {error.length > 0
            ? error.map((item, index) => {
              if (item.type === "EndDate") {
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

      <h1 className="text-center text-2xl mt-12">Reason</h1>
      <div className="mx-auto text-center mt-4 w-1/2 border-2 border-gray-500 py-6 rounded-lg shadow-lg bg-white mb-12">
        <TextField
          id="reason"
          label="Enter your reason..."
          type="text"
          value={reason}
          multiline
          rows={4}
          onChange={(e) => setReason(e.target.value)}
          defaultValue=""
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

      <h1 className="text-center font-semibold mb-4 text-sm text-green-500">{successMessage}</h1>

      <div className="mx-auto text-center">
        <button
          className="text-white bg-black px-4 py-2 rounded-xl"
          onClick={(e) => {
            e.preventDefault();
            validate() && LeaveApplicationData({ studentid: localStorage.getItem("id"), message: reason, date_to: endDate, date_from: startDate });
          }
          }
        >
          Submit
        </button>
      </div>

    </div>
  );
}

export default LeaveApplication;
