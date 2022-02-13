import React from "react";
import man from "../assets/img/man.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { localStorageKey } from "../utils/localStorageKey";

export default function Profile() {
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
          {localStorage.getItem(localStorageKey.name)}
        </p>
        <p className="text-sm mt-3">Contact No.</p>
        <p className="text-lg font-bold mt-0.5">
          {localStorage.getItem(localStorageKey.contactNo)}
        </p>
        <p className="text-sm mt-3">Email</p>
        <p className="text-lg font-bold mt-0.5">
          {localStorage.getItem(localStorageKey.email)}
        </p>
        <p className="text-sm mt-3">Room No</p>
        <p className="text-lg font-bold mt-0.5">
          {localStorage.getItem(localStorageKey.hostelId)
            ? localStorage.getItem(localStorageKey.hostelId)
            : "Not Assigned"}
        </p>
        <p className="text-sm mt-3">Gender</p>
        <p className="text-lg font-bold mt-0.5">
          {localStorage.getItem(localStorageKey.gender)}
        </p>
        <p className="text-sm mt-3">Address</p>
        <p className="text-lg font-bold mt-0.5">
          {localStorage.getItem(localStorageKey.location)}
        </p>
      </div>
    </>
  );
}
