import React, { useState, useEffect } from "react";
import baseurl from "../config";
import axios from "axios";
import { localStorageKey } from "../utils/localStorageKey";
import { TextField } from "@material-ui/core";
import { useLeaveApplicationList } from "../queries/hooks";

export default function LeaveApplications() {
  const [application, setApplication] = useState([]);
  const [resolveStatus, SetResolveStatus] = useState(false); // true, false
  const [boxIndex, setBoxIndex] = useState(undefined);
  const [reason, setReason] = useState("");
  const [resolved, setResolved] = useState(false);
  const [message, setMessage] = useState("");

  const handleReasonChange = (e) => {
    e.preventDefault();
    setReason(e.target.value);
  };

  const handleSubmit = async (e, studentid) => {
    e.preventDefault();
    setMessage("Updating leave application");
    const res = await axios.post(
      `${baseurl}/updateLeaveApplication`,
      {
        studentid: studentid,
        wardenid: localStorage.getItem(localStorageKey.id),
        name: localStorage.getItem(localStorageKey.name),
        status: resolveStatus ? "Approved" : "Rejected",
        remarks: reason,
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

    setMessage("");
    setResolved(true);
    console.log("resolved the leave application");
  };

  const leaveApplicationList = useLeaveApplicationList({
    wardenid: localStorage.getItem(localStorageKey.id),
  });

  useEffect(() => {
    leaveApplicationList.refetch();
  }, [resolved]);

  return (
    <div>
      <p className="font-bold text-3xl text-center mt-12 mb-8">
        Leave Applications
      </p>
      <div className="flex gap-4 flex-col">
        {leaveApplicationList.data > 0 ? leaveApplicationList.data?.filter((e) => e.status === "Pending")?.map((application, index) => {
          return (
            <div
              className="mx-32 px-6 py-4 border border-gray-400 rounded-lg"
              key={index}
            >
              <p className="text-2xl">{application.studentid}</p>
              {message && (
                <p className="text-2xl text-green-500 text-center mt-8">
                  {message}
                </p>
              )}
              <p className="text-lg">
                From: <b>{application.date_from.split("T")[0]}</b> | To:{" "}
                <b>{application.date_to.split("T")[0]}</b>
              </p>
              <p className="">{application.message}</p>
              <div className="flex justify-between mt-2">
                <button
                  className="bg-green-500 text-white px-10 py-1 rounded"
                  onClick={() => {
                    SetResolveStatus(true);
                    setBoxIndex(index);
                  }}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-10 py-1 rounded"
                  onClick={() => {
                    SetResolveStatus(false);
                    setBoxIndex(index);
                  }}
                >
                  Reject
                </button>
              </div>

              {boxIndex == index && (
                <div
                  className={` mx-auto grid grid-row grid-rows-2 mt-12 ${resolveStatus ? "border-green-500" : "border-red-500"
                    } w-80 border-2 py-6 rounded-lg shadow-lg `}
                >
                  <div className="text-center ">
                    <TextField
                      id="reason"
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
                  <div className="mx-auto mt-12 bg-black text-white rounded-md px-4 py-2 my-4">
                    <button
                      onClick={(e) => handleSubmit(e, application.studentid)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        }) : <div className="italic text-center">Hurray! No leave applications to resolve. Please check back later.</div>}
      </div>
    </div>
  );
}
