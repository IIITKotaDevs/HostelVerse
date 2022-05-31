import React from "react";
import man from "../assets/img/man.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { localStorageKey } from "../utils/localStorageKey";
import { useLocation } from "react-router";
import { useStudentDetails } from "../queries/hooks";

export default function Profile() {

  const studentDetails = useStudentDetails({
    studentid: localStorage.getItem(localStorageKey.id),
  });

  const location = useLocation();
  return (
    <>
      <div className="flex flex-col items-center pt-12 bg-profile bg-cover h-screen">
        <div className="flex gap-4 items-center">
          <p className="font-bold text-3xl">Profile</p>
          <FontAwesomeIcon icon={solid("pen")} className="text-xl" />
        </div>
        <img src={man} alt="" className="w-32 h-32 my-4" />
        <p className="text-sm">Name</p>
        <p className="text-lg font-bold mt-0.5">
          {studentDetails?.data?.student?.profile?.name}
        </p>
        <p className="text-sm mt-3">Contact No.</p>
        <p className="text-lg font-bold mt-0.5">
          {studentDetails?.data?.student?.profile?.contactno}
        </p>
        <p className="text-sm mt-3">Email</p>
        <p className="text-lg font-bold mt-0.5">
          {studentDetails?.data?.student?.profile?.email}
        </p>
        {location.pathname.split("/")[1] === "student" ? (
          <>
            <p className="text-sm mt-3">Hostel No</p>
            <p className="text-lg font-bold mt-0.5">
              {studentDetails?.data?.student?.hostelid || "Not Yet Assigned"}
            </p>
            <p className="text-sm mt-3">Room No</p>
            <p className="text-lg font-bold mt-0.5">
              {studentDetails?.data?.student?.roomid || "Not Yet Assigned"}
            </p>
          </>
        ) : null}
        <p className="text-sm mt-3">Gender</p>
        <p className="text-lg font-bold mt-0.5">
          {studentDetails?.data?.student?.profile?.gender}
        </p>
      </div>
    </>
  );
}
