import React, { useState, useEffect } from "react";
import baseurl from "../config";
import axios from "axios";

export default function RoomIssuesList() {
  const [issues, setIssues] = useState([]);

  const getRoomIssues = async () =>
    await axios
      .get(`${baseurl}/getRoomIssue`, {
        params: { wardenid: localStorage.getItem("id") },
        headers: {
          Authorization: localStorage.getItem("jwtToken")
            ? `Bearer ${localStorage.getItem("jwtToken")}`
            : "",
        },
      })
      .then((res) => {
        setIssues(res.data);
      });

  useEffect(() => {
    getRoomIssues();
  }, []);

  return (
    <div>
      <p className="font-bold text-3xl text-center mt-12 mb-8">Room Issues</p>
      <div className="flex gap-4 flex-col">
        {issues.map((issues, index) => {
          return (
            <div
              className="mx-32 px-6 py-4 border border-gray-400 rounded-lg"
              key={index}
            >
              <p className="text-2xl">{issues?.studentid}</p>
              {issues.roomno && issues.hostelid ? (
                <p>
                  Room No. {issues.roomno} | Hostel No. {issues.hostelid}
                </p>
              ) : (
                <p>No Room/Hostel Assigned</p>
              )}
              <p className="text-lg">
                Created at: <b>{issues.created_at.split("T")[0]}</b>
              </p>
              <p className="">{issues?.remarks}</p>
              <button className="bg-green-500 text-white px-10 py-1 rounded mt-4">
                Approve
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
