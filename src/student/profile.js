import React from "react";
import person from "../assets/img/person.jpg";
import { localStorageKey } from "../utils/localStorageKey";
import { useLocation } from "react-router";
import { useStudentDetails } from "../queries/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router";

export default function Profile() {

  const studentDetails = useStudentDetails({
    studentid: localStorage.getItem(localStorageKey.id),
  });

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center items-center bg-profile bg-cover h-screen">
        <div className="w-2/3 flex bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="w-1/2">
            <img src={person} />
          </div>
          <div className="w-1/2 flex items-center">
            <div className="w-full flex flex-col px-8 gap-y-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400">NAME</p>
                  <p className="text-lg font-bold text-gray-800">{studentDetails?.data?.student?.profile?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400">Student ID</p>
                  <p className="text-lg font-bold text-gray-800">{studentDetails?.data?.student?.profile?.studentid}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400">EMAIL</p>
                  <p className="text-lg font-bold text-gray-800">{studentDetails?.data?.student?.profile?.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400">PHONE</p>
                  <p className="text-lg font-bold text-gray-800">{studentDetails?.data?.student?.profile?.contactno}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400">HOSTEL</p>
                  <p className="text-lg font-bold text-gray-800">{studentDetails?.data?.student?.hostelid}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400">ROOM</p>
                  <p className="text-lg font-bold text-gray-800">{studentDetails?.data?.student?.roomid}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400">BATCH</p>
                  <p className="text-lg font-bold text-gray-800">{studentDetails?.data?.student?.batch}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400">STATUS</p>
                  <p className="text-lg font-bold text-gray-800">{studentDetails?.data?.attendenceStatus?.data}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400">GENDER</p>
                  <p className="text-lg font-bold text-gray-800">{studentDetails?.data?.student?.profile?.gender}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400">ROLE</p>
                  <p className="text-lg font-bold text-gray-800 capitalize">{studentDetails?.data?.student?.profile?.role}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold text-gray-400">SOCIAL</p>
                <div className="flex gap-12 text-lg">
                  <FontAwesomeIcon className="cursor-pointer text-pink-500" icon={brands("instagram")} />
                  <FontAwesomeIcon className="cursor-pointer text-blue-700" icon={brands('linkedin-in')} />
                  <FontAwesomeIcon className="cursor-pointer" icon={brands('github')} />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <button className="px-4 py-1 bg-primary rounded font-roboto font-medium text-white" onClick={() => navigate("/student/update-profile")}>Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
