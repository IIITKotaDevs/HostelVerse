import axios from "axios";
import React from "react";
import baseurl from "../config";
import { localStorageKey } from "../utils/localStorageKey";
import { useStudentList } from "../queries/hooks";

export default function StudentList() {
  const studentList = useStudentList({
    wardenid: localStorage.getItem(localStorageKey.id),
  });

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
        studentList.refetch();
      });
  };

  return (
    <>
      <p className="font-bold text-3xl text-center mt-12 mb-8">Student List</p>
      <div className="flex flex-col gap-4">
        {studentList?.data?.data > 0 ? studentList?.data?.data?.map((student, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center mx-32 px-10 py-4 border bg-yellow-300 border-gray-200 rounded-lg"
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
        }) : <p className="italic text-center">No students under this warden yet.</p>}
      </div>
    </>
  );
}
