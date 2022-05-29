import React, { useState, useEffect } from "react";
import baseurl from "../config";
import axios from "axios";

export default function LeaveApplications() {
  const [application, setApplication] = useState([]);
  const getLeaveApplications = async () => {
    const application = await axios.get(
      `${baseurl}/getLeaveApplications`,
      {
        params: { wardenid: localStorage.getItem("id") },
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken")
            ? `Bearer ${localStorage.getItem("jwtToken")}`
            : "",
        },
      }
    );
    setApplication(application.data);
  };

  useEffect(() => {
    getLeaveApplications();
  }, []);

  return (
    <div>
      <p className="font-bold text-3xl text-center mt-12 mb-8">
        Leave Applications
      </p>
      <div className="flex gap-4 flex-col">
        {application.map((application, index) => {
          return (
            <div className="mx-32 px-6 py-4 border border-gray-400 rounded-lg">
              <p className="text-2xl">{application.studentid}</p>
              <p className="text-lg">
                From: <b>{application.date_from.split("T")[0]}</b> | To:{" "}
                <b>{application.date_to.split("T")[0]}</b>
              </p>
              <p className="">{application.message}</p>
              <div className="flex justify-between mt-2">
                <button className="bg-green-500 text-white px-10 py-1 rounded">
                  Approve
                </button>
                <button className="bg-red-500 text-white px-10 py-1 rounded">
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
