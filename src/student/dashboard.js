import axios from "axios";
import React, { useEffect, useState } from "react";
import man from "../assets/img/man.png";
import { useStudentDetails } from "../queries/hooks";
import baseurl from "../config";
import { useLocation } from "react-router";
import { localStorageKey } from "../utils/localStorageKey";
import { useMutateCheckIn, useMutateCheckOut } from "../queries/mutations";

export default function Dashboard() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [error, setError] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [checkedIn, setCheckedIn] = useState('');

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
      value: studentData?.hostelid,
    },
    {
      title: "Room No.",
      value: studentData?.roomid,
    },
  ];

  const data2 = [
    {
      name: "Hostel 1",
      advance: [
        {
          title: "Occupancy Rate",
          value: "20%",
        },
        {
          title: "Due Payments",
          value: "08/20",
        },
        {
          title: "Issue Resolved",
          value: "17/20",
        },
      ],
    },
    {
      name: "Hostel 2",
      advance: [
        {
          title: "Occupancy Rate",
          value: "20%",
        },
        {
          title: "Due Payments",
          value: "08/20",
        },
        {
          title: "Issue Resolved",
          value: "17/20",
        },
      ],
    },
    {
      name: "Hostel 3",
      advance: [
        {
          title: "Occupancy Rate",
          value: "20%",
        },
        {
          title: "Due Payments",
          value: "08/20",
        },
        {
          title: "Issue Resolved",
          value: "17/20",
        },
      ],
    },
  ];

  const location = useLocation();

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

  useEffect(() => {
    setStudentData(studentDetails?.data?.student);
    setCheckedIn(studentDetails?.data?.attendenceStatus?.data === 'In Hostel' ? 'In Hostel' : 'Not In Hostel');
  }, [studentDetails.isSuccess, studentDetails.refetch()]);

  if (localStorage.getItem(localStorageKey.checked) === null) return null;
  else
    if (location.pathname.split("/")[1] === "student")
      return (
        <div className="px-16 py-10 bg-dashboard bg-cover h-screen">
          <p className="font-medium text-gray-800 text-xl">{time}</p>
          <p className="font-bold text-4xl text-primary mt-2">{today}</p>
          <div className="mt-16 flex items-center gap-8">
            <img src={man} alt="" className="w-32" />
            <div className="flex flex-col gap-1">
              <p className="text-gray-800 font-medium text-xl">Welcome</p>
              <p className="text-black font-bold text-3xl">
                {studentData?.profile?.name}
              </p>
              <p className="text-gray-800 font-medium text-xl">
                Have a good day !!!
              </p>
            </div>
          </div>
          <div className="flex gap-8 mt-8">
            {data.map((item, index) => (
              <div key={index} className="text-center bg-primary2 p-6 rounded">
                <p className="text-sm">{item.title}</p>
                <p className="font-bold italic font-nunito text-3xl">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
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
      );
    else
      return (
        <div className="px-16 py-10 bg-dashboard h-auto bg-cover">
          <p className="font-medium text-gray-800 text-xl">{time}</p>
          <p className="font-bold text-4xl text-primary mt-2">{today}</p>
          <div className="mt-16 flex items-center gap-8">
            <img src={man} alt="" className="w-32" />
            <div className="flex flex-col gap-1">
              <p className="text-gray-800 font-medium text-xl">Welcome</p>
              <p className="text-black font-bold text-3xl">Abc Admin</p>
              <p className="text-gray-800 font-medium text-xl">
                Have a good day !!!
              </p>
            </div>
          </div>
          <p className="text-xl font-bold mt-10 mb-4">Occupancy Rate</p>
          <div className="flex flex-col gap-4">
            {data2.map((item, index) => {
              return (
                <div
                  className="w-1/2 border-2 border-gray-400 rounded-lg"
                  key={index}
                >
                  <div className="border-b-2 border-gray-400 text-center font-bold py-1">
                    {item.name}
                  </div>
                  <div className="flex justify-around">
                    {item.advance.map((item, index) => {
                      return (
                        <div className="text-center py-2" key={index}>
                          <p>{item.title}</p>
                          <p className="font-bold">{item.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
}
