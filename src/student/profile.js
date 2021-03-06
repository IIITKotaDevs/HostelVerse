import React from "react";
import { useParams } from "react-router-dom";
import person from "../assets/img/person.jpg";
import { localStorageKey } from "../utils/localStorageKey";
import { useStudentDetails, useWardenProfile, useAdminProfile } from "../queries/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";

export default function Profile() {

  const studentDetails = useStudentDetails({
    studentid: localStorage.getItem(localStorageKey.id),
  });

  const wardenProfile = useWardenProfile({
    wardenid: localStorage.getItem(localStorageKey.id),
  });

  const adminProfile = useAdminProfile({
    adminid: localStorage.getItem(localStorageKey.id),
  });

  const navigate = useNavigate();
  const params = useParams();

  let image = person;
  switch (params.type) {
    case "student":
      image = studentDetails.data?.student.profile.image;
      break;
    case "warden":
      image = wardenProfile.data?.message.profile.image;
      break;
    case "admin":
      image = adminProfile.data?.data.profile.image;
      break;
    default:
      break;
  }


  return (
    <>
      <div className="flex justify-center items-center bg-profile bg-cover h-screen">
        {(params.user === 'student' ? studentDetails?.data?.student : (params.user === "warden" ? wardenProfile?.data?.message : adminProfile?.data?.data)) ? <div className="w-2/3 flex bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="w-1/2">
            <img src={image || person} className="w-full h-full object-cover" />
          </div>
          <div className="w-1/2 flex items-center py-6">
            <div className="w-full flex flex-col px-8 gap-y-2">
              <div className="flex justify-between">
                <div>
                  <p className="text-xxs font-bold text-gray-400">NAME</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800">{params.user === "student" ? studentDetails?.data?.student?.profile?.name : (params.user === "warden" ? wardenProfile?.data?.message?.profile?.name : adminProfile?.data?.data?.profile?.name)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xxs font-bold text-gray-400">STUDENT ID</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800 uppercase">{params.user === "student" ? studentDetails?.data?.student?.profile?.studentid : (params.user === "warden" ? wardenProfile?.data?.message?.profile?.wardenid : adminProfile?.data?.data?.profile?.adminid)}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-xxs font-bold text-gray-400">EMAIL</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800">{params.user === "student" ? studentDetails?.data?.student?.profile?.email : (params.user === "warden" ? wardenProfile?.data?.message?.profile?.email : adminProfile?.data?.data?.profile?.email)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xxs font-bold text-gray-400">PHONE</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800">{params.user === "student" ? studentDetails?.data?.student?.profile?.contactno : (params.user === "warden" ? wardenProfile?.data?.message?.profile?.contactno : adminProfile?.data?.data?.profile?.contactno)}</p>
                </div>
              </div>
              <div className="flex justify-between">
                {params.user === "student" || params.user === "warden" ?
                  <div>
                    <p className="text-xxs font-bold text-gray-400">HOSTEL</p>
                    <p className="text-lg -mt-1 font-bold text-gray-800">{params.user === "student" ? studentDetails?.data?.student?.hostelid : (params.user === "warden" ? wardenProfile?.data?.message?.hostelid : adminProfile?.data?.data?.hostelid)}</p>
                  </div>
                  : null}
                {params.user === "student" ? <div className="text-right">
                  <p className="text-xxs font-bold text-gray-400">ROOM</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800">{studentDetails?.data?.student?.roomid}</p>
                </div>
                  : null}
                {params.user === "warden" ? <div className="text-right">
                  <p className="text-xxs font-bold text-gray-400">ROLE</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800 capitalize">{wardenProfile?.data?.message?.role || adminProfile?.data?.data?.role}</p>
                </div>
                  : null}
                {params.user === "admin" ? <div className="">
                  <p className="text-xxs font-bold text-gray-400">ROLE</p>
                  <p className="text-lg -mt-1 font-bold text-gray-800 capitalize">{adminProfile?.data?.data?.role}</p>
                </div>
                  : null}
              </div>
              {params.user === "student" ?
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
                : null}
              {params.user === "student" ?
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
                : null}
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
                <button className="px-4 py-1 bg-primary rounded font-roboto font-medium text-white text-sm shadow-md hover:shadow-none transition-all" onClick={() => navigate(`/${params.user}/update-profile`)}>Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
          : <Loader />}
      </div>
    </>
  );
}
