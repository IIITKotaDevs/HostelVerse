import React from "react";
import person from "../assets/img/person.jpg";
import { localStorageKey } from "../utils/localStorageKey";
import { useLocation } from "react-router";
import { useStudentDetails } from "../queries/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";

export default function Profile() {

  const studentDetails = useStudentDetails({
    studentid: localStorage.getItem(localStorageKey.id),
  });

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center items-center bg-profile bg-cover h-screen">
        {studentDetails?.data?.student ? <div className="w-2/3 flex bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="w-1/2">
            <img src={studentDetails?.data?.student?.profile?.picture || person} className="w-full h-full object-cover" />
          </div>
          <div className="w-1/2 flex items-center py-6">
            <div className="w-full flex flex-col px-8 gap-y-2">
              <div className="flex justify-between">
                <div>
                  <p className="text-xxs font-bold text-gray-400">NAME</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800">{studentDetails?.data?.student?.profile?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xxs font-bold text-gray-400">STUDENT ID</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800">{studentDetails?.data?.student?.profile?.studentid}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-xxs font-bold text-gray-400">EMAIL</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800">{studentDetails?.data?.student?.profile?.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xxs font-bold text-gray-400">PHONE</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800">{studentDetails?.data?.student?.profile?.contactno}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-xxs font-bold text-gray-400">HOSTEL</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800">{studentDetails?.data?.student?.hostelid}</p>
                </div>
                <div className="text-right">
                  <p className="text-xxs font-bold text-gray-400">ROOM</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800">{studentDetails?.data?.student?.roomid}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-xxs font-bold text-gray-400">BATCH</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800">{studentDetails?.data?.student?.batch}</p>
                </div>
                <div className="text-right">
                  <p className="text-xxs font-bold text-gray-400">STATUS</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800">{studentDetails?.data?.attendenceStatus?.data}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-xxs font-bold text-gray-400">GENDER</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800">{studentDetails?.data?.student?.profile?.gender}</p>
                </div>
                <div className="text-right">
                  <p className="text-xxs font-bold text-gray-400">ROLE</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800 capitalize">{studentDetails?.data?.student?.profile?.role}</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                {studentDetails?.data?.student?.profile?.description ? <p className="text-xxs font-bold text-gray-400">BIO</p> : null}
                <p className="font-nunito text-sm font-medium text-center">{studentDetails?.data?.student?.profile?.description}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                {studentDetails?.data?.student?.profile?.instagramHandle || studentDetails?.data?.student?.profile?.twitterHandle || studentDetails?.data?.student?.profile?.githubHandle || studentDetails?.data?.student?.profile?.linkedinHandle ? <p className="text-xxs font-bold text-gray-400">SOCIAL</p> : null}
                <div className="flex gap-12 text-lg">
                  {studentDetails?.data?.student?.profile?.instagramHandle ? <FontAwesomeIcon className="cursor-pointer text-pink-500" icon={brands("instagram")} onClick={() => window.open(studentDetails?.data?.student?.profile?.instagramHandle, "_blank")} /> : null}
                  {studentDetails?.data?.student?.profile?.linkedinHandle ? < FontAwesomeIcon className="cursor-pointer text-blue-700" icon={brands('linkedin-in')} onClick={() => window.open(studentDetails?.data?.student?.profile?.linkedinHandle, "_blank")} /> : null}
                  {studentDetails?.data?.student?.profile?.githubHandle ? <FontAwesomeIcon className="cursor-pointer" icon={brands('github')} onClick={() => window.open(studentDetails?.data?.student?.profile?.githubHandle, "_blank")} /> : null}
                  {studentDetails?.data?.student?.profile?.twitterHandle ? <FontAwesomeIcon className="cursor-pointer text-blue-500" icon={brands('twitter')} onClick={() => window.open(studentDetails?.data?.student?.profile?.twitterHandle, "_blank")} /> : null}
                </div>
              </div>
              <div className="flex flex-col items-center mt-2">
                <button className="px-4 py-1 bg-primary rounded font-roboto font-medium text-white text-sm shadow-md" onClick={() => navigate("/student/update-profile")}>Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
          : <Loader />}
      </div>
    </>
  );
}
