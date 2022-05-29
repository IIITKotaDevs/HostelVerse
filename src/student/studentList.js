import axios from "axios";
import React, { useState, useEffect } from "react";
import baseurl from "../config";
import { localStorageKey } from "../utils/localStorageKey";

export default function StudentList() {
  const [students, setStudents] = useState([]);

  const getStudentsList = async () => {
    try {
      const student = await axios.get(`${baseurl}/getStudent`, {
        params: {
          wardenid: localStorage.getItem(localStorageKey.id),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
        },
      });
      setStudents(student.data.data);
    } catch (error) {
      console.log("error aa gaya bro ");
    }
  };

  console.log(localStorage.getItem(localStorageKey.jwtToken));

  useEffect(() => {
    const fetchStudentsList = async () => {
      await getStudentsList();
    };
    fetchStudentsList();
  }, []);

  const removeStudent = async (studentItem) => {
    axios
      .post(
        `${baseurl}/warden/removeStudent`,
        {
          studentid: studentItem.studentid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              localStorageKey.jwtToken
            )}`,
            "Content-type": "application/json",
          },
        }
      )
      .then(() => {
        getStudentsList();
      });
  };

  return (
    <>
      <p className="font-bold text-3xl text-center mt-12 mb-8">Student List</p>
      <div className="flex flex-col gap-4">
        {students.map((student, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center mx-32 px-10 py-4 border border-gray-200 rounded-lg"
            >
              <div>
                <p className="text-3xl font-semibold">{student.profile.name}</p>
                {student.roomid && student.hostelid ? (
                  <p className="text-lg mt-2">
                    Room: {student?.roomid} | Hostel: {student?.hostelid}
                  </p>
                ) : (
                  <p className="text-lg mt-2">No Room/Hostel Assigned</p>
                )}
                <p
                  className="text-red-500 text-lg cursor-pointer font-medium mt-2"
                  onClick={() => removeStudent(student)}
                >
                  Remove Student
                </p>
              </div>
              <img
                src={student.profile.picture}
                alt=""
                className="w-20 rounded-full"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
