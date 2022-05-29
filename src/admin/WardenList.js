import axios from "axios";
import React, { useState, useEffect } from "react";
import baseurl from "../config";
import { localStorageKey } from "../utils/localStorageKey";

export default function WardenList() {
  const [wardens, setWardens] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWardenList = async () => {
    setLoading(true);
    try {
      const warden = await axios.get(`${baseurl}/getWarden`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
        },
      });
      setWardens(warden.data.data);
      setLoading(false);
    } catch (error) {
      console.log("error aa gaya bro");
      setLoading(false);
    }
  };

  useEffect(() => {
    getWardenList();
  }, []);

  const removeWarden = async (wardenItem) => {
    axios
      .post(
        `${baseurl}/deleteWarden`,
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
      {loading && <p className="text-2xl text-center mt-8">Loading...</p>}
      <div className="flex flex-col gap-4">
        {wardens.map((warden, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center mx-32 px-10 py-4 border border-gray-200 rounded-lg shadow-md"
            >
              <div>
                <p className="text-3xl font-semibold">{warden.name}</p>
                <p className="text-lg mt-2">Warden of: {warden?.hostelid}</p>
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
