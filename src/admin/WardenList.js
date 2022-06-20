import React, { useState, useEffect } from "react";
import { useWardenList } from "../queries/hooks";
import { localStorageKey } from "../utils/localStorageKey";
import Loader from "../components/Loader";
import person from '../assets/img/person.jpg'

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
    <div className="bg-gray-75">
      <p className="font-bold text-3xl text-center pt-12 mb-8">Warden List</p>
      {wardenListData ? (
        <div className="flex flex-wrap justify-center gap-8 pb-8">
          {wardenListData.map((warden, index) => {
            return (
              <div key={warden?.profile?.wardenid} className="w-1/5 rounded-lg shadow-lg overflow-hidden bg-white py-8 px-12 divide-y-2">
                <div className="w-full flex flex-col items-center pb-4">
                  <img src={warden?.profile?.picture || person} alt="" className="items-center w-24 rounded-full shadow-2xl" />
                  <p className="pt-4 font-bold text-xl hover:text-primary transition-all cursor-pointer" onClick={() => { navigate(`/warden-detail/${warden?.profile?.wardenid}`) }}>{warden?.profile?.name}</p>
                  <p className="text-xs text-gray-600 font-semibold font-roboto uppercase">{warden?.profile?.wardenid}</p>
                </div>
                <div className={`w-full flex justify-between pt-4`}>
                  <button className="cursor-pointer bg-green-500 px-4 py-1 font-mono uppercase rounded font-semibold text-white text-sm">Chat</button>
                  <button className="cursor-pointer bg-red-500 px-4 py-1 font-mono uppercase rounded font-semibold text-white text-sm"
                    onClick={() => {
                      handleRemoveWarden(warden?.profile?.wardenid);
                    }}
                  >Remove</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : <Loader />}
    </div>
  );
}
