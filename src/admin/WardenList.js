import axios from "axios";
import React, { useState, useEffect } from "react";
import baseurl from "../config";
import { useWardenList } from "../queries/hooks";
import { localStorageKey } from "../utils/localStorageKey";
import Loader from "../components/Loader";

export default function WardenList() {
	const [wardenListData, setWardenListData] = useState([]);

	const wardenList = useWardenList({});

	const baseUrl = "https://hostelverse-backend.azurewebsites.net/api";

	useEffect(() => {
    setWardenListData(wardenList.data?.data);
  }, [wardenList.isSuccess === true]);

  const handleRemoveWarden = async (id) => {
    const response = await fetch(baseUrl + "/deleteWarden", {
      method: "POST",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(localStorageKey.token)}`,
      },
    });
    if (response.status === 200) {
      wardenList.refetch();
    }
	}

  return (
    <>
      <p className="font-bold text-3xl text-center mt-12 mb-8">Warden List</p>
      <div className="flex flex-col gap-4">
      {wardenListData ? (
      	<div>
      	{wardenListData.map((warden, index) => {
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
                  onClick={() => {
                        handleRemoveWarden(warden.profile.wardenid)
                      }}
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
      ) : <Loader />}
        
      </div>
    </>
  );
}
