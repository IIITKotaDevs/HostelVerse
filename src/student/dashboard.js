import React, { useEffect, useState } from "react";
import man from "../assets/img/man.png";
import { useStudentDetails, useAdminProfile, useAdminDashboard } from "../queries/hooks";
import { useParams } from 'react-router-dom'
import { localStorageKey } from "../utils/localStorageKey";
import { useMutateCheckIn, useMutateCheckOut } from "../queries/mutations";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [error, setError] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [checkedIn, setCheckedIn] = useState('');
  const [dashboardData, setDashboardData] = useState([]);

  setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);

  var objToday = new Date(),
    domEnder = (function () {
      var a = objToday;
      if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
      a = parseInt((a + "").charAt(1));
      return 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th";
    })(),
    dayOfMonth =
      today + (objToday.getDate() < 10)
        ? "0" + objToday.getDate() + domEnder
        : objToday.getDate() + domEnder,
    months = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear();
  var today = dayOfMonth + " " + curMonth + ", " + curYear;

  const data = [
    {
      title: "Hostel No.",
      value: studentData?.hostelid || "Unallocated",
    },
    {
      title: "Room No.",
      value: studentData?.roomid || "Unallocated",
    },
  ];

  const params = useParams();

  const { mutateAsync: checkInData } = useMutateCheckIn({
    onSuccess: () => {
      studentDetails.refetch();
    },
    onError: () => { },
  });

  const { mutateAsync: checkOutData } = useMutateCheckOut({
    onSuccess: () => {
      studentDetails.refetch();
    },
    onError: () => { },
  });

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [error.length > 0]);

  const studentDetails = useStudentDetails({
    studentid: localStorage.getItem(localStorageKey.id),
  });

  const adminProfile = useAdminProfile({
    adminid: localStorage.getItem(localStorageKey.id),
  });

  const adminDashboard = useAdminDashboard();

  useEffect(() => {
    if (adminDashboard.data?.occupancyRate?.length > 0) {
      const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);
      setDashboardData(zip(adminDashboard?.data?.occupancyRate, adminDashboard?.data?.issueClearanceRate));
    }
  }, [adminDashboard?.data?.occupancyRate?.length > 0]);

  useEffect(() => {
    setStudentData(studentDetails?.data?.student);
    setCheckedIn(studentDetails?.data?.attendenceStatus?.data === 'In Hostel' ? 'In Hostel' : 'Not In Hostel');
  }, [studentDetails]);

  return (
    <>
      {studentDetails?.data || adminProfile?.data ? (
        <div className="px-16 py-10 bg-dashboard bg-cover">
          <p className="font-medium text-gray-800 text-xl">{time}</p>
          <p className="font-bold text-4xl text-primary mt-2">{today}</p>
          <div className="mt-16 flex items-center gap-8">
            <img src={man} alt="" className="w-32" />
            <div className="flex flex-col gap-1">
              <p className="text-gray-800 font-medium text-xl">Welcome</p>
              <p className="text-black font-bold text-3xl">
                {studentData?.profile?.name || adminProfile?.data?.data?.profile?.name}
              </p>
              <p className="text-gray-800 font-medium text-xl">
                Have a good day !!!
              </p>
            </div>
          </div>
          {params.user === "student" ? <div className="flex gap-8 mt-8">
            {data.map((item, index) => (
              <div key={index} className="text-center bg-primary2 p-6 rounded">
                <p className="text-sm">{item.title}</p>
                <p className="font-bold italic font-nunito text-3xl">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
            : null}
          {params.user === "student" && studentData?.roomAlloted ?
            <div>
              <p className={`text-xl font-bold mt-10 mb-2`}>Check In / Out</p>
              <button
                className={`w-96 text-white font-bold py-2 rounded-xl text-lg ${checkedIn !== 'In Hostel' ? "bg-red-600" : "bg-green-600"
                  }`}
                onClick={checkedIn !== 'In Hostel' ? () => checkInData({
                  studentid: localStorage.getItem(localStorageKey.id),
                  location: "26.9124, 75.7873",
                  // location: localStorage.getItem(localStorageKey.location),
                }) : () => checkOutData({
                  studentid: localStorage.getItem(localStorageKey.id),
                  // location: "26.9124,75.7873",
                  location: localStorage.getItem(localStorageKey.location),
                })}
              >
                You are {checkedIn === 'In Hostel' ? "IN" : "OUT"}
              </button>
              <span>
                <p className="text-sm text-red-500 italic pt-1 font-medium">{error}</p>
              </span>
              <p className="text-xs mt-1">
                Pro Tip: Click on the button to Check In or Check Out.
              </p>
            </div>
            : null}

          {params.user === "admin" ? <div>
            <p className="text-xl font-bold mt-16">Hostel Statistics</p>
            <div class="flex flex-col w-1/2">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="overflow-hidden rounded-xl">
                    <table class="w-full">
                      <thead class="bg-gray-700 border-b text-white">
                        <tr>
                          <th scope="col" class="font-medium px-6 py-4 text-left">
                            Hostel Name
                          </th>
                          <th scope="col" class="font-medium px-6 py-4 text-left">
                            Warden Name
                          </th>
                          <th scope="col" class="font-medium px-6 py-4 text-left">
                            Occupancy
                          </th>
                          <th scope="col" class="font-medium px-6 py-4 text-left">
                            Issue Resolved
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.map((item, index) => {
                          return (
                            <tr className="odd:bg-gray-300 even:bg-gray-200 text-white" key={index}>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 font-semibold">{item[0].hostelname}</td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{item[0].wardenname}</td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{item[0].occupancyRate ? `${item[0].occupancyRate}%` : 'None'}</td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{item[1].issueClearanceRate ? `${item[1].issueClearanceRate}%` : 'None'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
            : null}
        </div>
      ) : <Loader />}
    </>
  );
}
