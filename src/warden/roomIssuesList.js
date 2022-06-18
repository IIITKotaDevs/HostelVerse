import React, { useState, useEffect } from "react";
import baseurl from "../config";
import axios from "axios";
import { localStorageKey } from "../utils/localStorageKey";
import { useRoomIssueList } from "../queries/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useMutateResolveRoomIssue } from "../queries/mutations";
import Loader from "../components/Loader";

export default function RoomIssuesList() {
  const [message, setMessage] = useState("");

  const { mutateAsync: ResolveRoomIssueData } = useMutateResolveRoomIssue({
    onSuccess: () => {
      roomIssueList.refetch();
    },
    onError: () => { },
  });

  const roomIssueList = useRoomIssueList({
    wardenid: localStorage.getItem(localStorageKey.id),
  });

  return (
    <>
      {roomIssueList.data ?
        <div className="mb-12">
          <p className="font-bold text-3xl text-center mt-12 mb-8">Room Issues</p>
          <div className="mx-32 grid grid-cols-3 items-stretch gap-6 mb-8">
            {roomIssueList.data?.filter((e) => e.status === "Pending")?.length > 0 ? roomIssueList?.data?.filter((e) => e.status === "Pending")?.map((issues, index) => {
              return (
                <div className="rounded-2xl overflow-hidden shadow-xl" key={index}>
                  <p className="bg-gray-800 text-sm font-medium text-right px-6 text-gray-100 py-3 pb-10">{(new Date(issues.created_at)).toDateString()}, {(new Date(issues.created_at)).toLocaleTimeString()}</p>
                  <div className="bg-white rounded-2xl px-6 py-4 -mt-8">
                    <div className="flex justify-between">
                      <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={solid('house')} className="text-gray-700 text-sm" />
                        <p className="font-medium">{issues.roomno}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={solid('building')} className="text-gray-700 text-sm" />
                        <p className="font-medium">{issues.hostelid}</p>
                      </div>
                    </div>
                    <pre className="text-gray-900 font-nunito whitespace-pre-wrap mt-2">{issues.remarks}</pre>
                    <button
                      className="bg-blue-500 hover:bg-green-700 transition-all text-sm text-white px-4 py-1 rounded mt-4"
                      onClick={(e) =>
                        ResolveRoomIssueData({
                          hostelid: issues.hostelid,
                          roomno: issues.roomno,
                          status: "Resolved",
                        })}
                    >
                      Assign
                    </button>
                  </div>
                </div>
              );
            }) : <p className="italic text-center col-span-3">Hurray! All issues resolved. Come back later.</p>
            }
          </div>
          {roomIssueList?.data?.filter((e) => e.status === "Resolved")?.length > 0 ?
            <div>
              <p className="font-semibold text-2xl text-center mt-20 mb-4">Resolved Earlier</p>
              <div className="mx-32 grid grid-cols-3 items-stretch gap-4 mb-8">
                {roomIssueList?.data?.filter((e) => e.status === "Resolved")?.map((issues, index) => {
                  return (
                    <div className="rounded-2xl overflow-hidden shadow-xl" key={index}>
                      <p className="bg-gray-800 text-sm font-medium text-right px-6 text-gray-100 py-3 pb-10">{(new Date(issues.created_at)).toDateString()}</p>
                      <div className="bg-white rounded-2xl px-6 py-4 -mt-8">
                        <div className="flex justify-between">
                          <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={solid('house')} className="text-gray-700 text-sm" />
                            <p className="font-medium">{issues.roomno}</p>
                          </div>
                          <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={solid('building')} className="text-gray-700 text-sm" />
                            <p className="font-medium">{issues.hostelid}</p>
                          </div>
                        </div>
                        <pre className="text-gray-900 font-nunito whitespace-pre-wrap mt-2">{issues.remarks}</pre>
                      </div>
                    </div >
                  );
                })}
              </div>
            </div> : null}
        </div>
        : <Loader />}
    </>
  );
}
