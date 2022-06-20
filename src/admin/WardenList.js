import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWardenList } from "../queries/hooks";
import Loader from "../components/Loader";
import person from "../assets/img/person.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { useMutateDeleteWarden } from "../queries/mutations";

export default function WardenList() {
  const [wardenListData, setWardenListData] = useState([]);
  const wardenList = useWardenList({});
  const navigate = useNavigate();

  useEffect(() => {
    setWardenListData(wardenList.data?.data);
  }, [wardenList.isSuccess]);

  const { mutateAsync: deleteWarden } = useMutateDeleteWarden({
    onSuccess: () => {
      window.location.reload();
    },
    onError: () => {},
  });

  return (
    <div
      className={`bg-gray-75 ${
        wardenListData && wardenListData.length < 5 ? "h-screen" : ""
      } `}
    >
      <p className="font-bold text-3xl text-center pt-12 mb-8">Warden List</p>
      {wardenListData ? (
        <div className="flex flex-wrap justify-center gap-8 pb-8">
          {wardenListData.map((warden, index) => {
            return (
              <div
                key={warden?.profile?.wardenid}
                className="w-1/5 rounded-lg shadow-lg overflow-hidden bg-white py-8 px-12 divide-y-2"
              >
                <div className="w-full flex flex-col items-center pb-4">
                  <img
                    src={warden?.profile?.picture || person}
                    alt=""
                    className="items-center w-24 rounded-full shadow-2xl"
                  />
                  <p
                    className="pt-4 font-bold text-xl hover:text-primary transition-all cursor-pointer"
                    onClick={() => {
                      navigate(`/warden-detail/${warden?.profile?.wardenid}`);
                    }}
                  >
                    {warden?.profile?.name}
                  </p>
                  <p className="text-xs text-gray-600 font-semibold font-roboto uppercase">
                    {warden?.profile?.wardenid}
                  </p>
                </div>
                <div className="w-full justify-center items-center py-4 text-gray-700 flex gap-4">
                  {warden?.profile?.contactno ? (
                    <FontAwesomeIcon
                      className="cursor-pointer"
                      icon={solid("phone")}
                      onClick={() => {
                        window.location.href = `tel:${warden?.profile?.contactno}`;
                      }}
                    />
                  ) : null}
                  {warden?.profile?.email ? (
                    <FontAwesomeIcon
                      className="cursor-pointer"
                      icon={solid("envelope")}
                      onClick={() => {
                        window.location.href = `mailto:${warden?.profile?.email}`;
                      }}
                    />
                  ) : null}
                </div>
                <div className={`w-full flex justify-between pt-4`}>
                  <button className="cursor-pointer bg-green-500 px-4 py-1 font-mono uppercase rounded font-semibold text-white text-sm">
                    Chat
                  </button>
                  <button
                    className="cursor-pointer bg-red-500 px-4 py-1 font-mono uppercase rounded font-semibold text-white text-sm"
                    onClick={() => {
                      deleteWarden({
                        wardenid: warden?.profile?.wardenid,
                      });
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
