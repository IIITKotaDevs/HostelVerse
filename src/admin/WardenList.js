import axios from "axios";
import React, { useState, useEffect } from "react";
import baseurl from "../config";
import { localStorageKey } from "../utils/localStorageKey";

export default function WardenList() {
  const [wardens, setWardens] = useState([]);

  const getWardenList = async () => {
    const warden = await axios.get(`${baseurl}/admin/viewWarden`);
    setWardens(warden.data);
  };

  useEffect(() => {
    console.log(localStorage.getItem("location"));
    getWardenList();
  }, []);

  const removeWarden = async (wardenItem) => {
    axios
      .post(
        `${baseurl}/admin/removeWarden`,
        {
          wardenid: wardenItem.wardenid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              localStorageKey.jwtToken
            )}`,
            "Content-type": "application/json",
          },
        }
      )
      .then(() => {
        getWardenList();
      });
  };

  return (
    <>
      <p className="font-bold text-3xl text-center mt-12 mb-8">Warden List</p>
      <div className="flex flex-col gap-4">
        {wardens.map((warden, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center mx-32 px-10 py-4 border border-gray-200 rounded-lg"
            >
              <div>
                <p className="text-3xl font-semibold">{warden.wardenname}</p>
                {warden.roomid && warden.hostelid ? (
                  <p className="text-lg mt-2">
                    {warden?.roomid} | {warden?.hostelid}
                  </p>
                ) : (
                  <p className="text-lg mt-2">No Room/Hostel Assigned</p>
                )}
                <p
                  className="text-red-500 text-lg cursor-pointer font-medium mt-2"
                  onClick={() => removeWarden(warden)}
                >
                  Remove Warden
                </p>
              </div>
              <img
                src={warden.profile.picture}
                alt=""
                className="w-20 rounded-full"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
