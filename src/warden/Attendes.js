import React, { useEffect, useState } from "react";
import { localStorageKey } from "../utils/localStorageKey";
import { useStudentAttendanceList } from "../queries/hooks";
import Loader from "../components/Loader";

export const Attendes = () => {
  const [attendanceList, setAttendanceList] = useState([]);

  const studentAttendanceList = useStudentAttendanceList({
    wardenid: localStorage.getItem(localStorageKey.id),
  });

  useEffect(() => {
    setAttendanceList(studentAttendanceList?.data?.data);
  }, [studentAttendanceList.isSuccess === true]);

  const filter = (name) => {
    const filteredData = studentAttendanceList.data?.data.filter((student) => {
      return student.name.toLowerCase().includes(name.toLowerCase()) || student.studentid.toLowerCase().includes(name.toLowerCase());
    });
    setAttendanceList(filteredData);
  }

  return (
    <div>
      <p className="font-bold text-3xl text-center mt-12 mb-8">Check In / Out Log</p>
      <div className="flex justify-center mb-4">
        <input type="text" className='w-1/2 px-4 py-1 rounded-lg shadow-md border-1 border-gray-100' placeholder="Search by Name or Roll Number" onChange={(e) => { filter(e.target.value) }} />
      </div>
      {attendanceList ? attendanceList?.length > 0 ? (
        <div class="flex flex-col mx-32">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden rounded-3xl">
                <table class="w-full">
                  <thead class="bg-gray-700 text-white border-b">
                    <tr>
                      <th scope="col" class="font-medium px-6 py-4 text-left">
                        Student ID
                      </th>
                      <th scope="col" class="font-medium px-6 py-4 text-left">
                        Name
                      </th>
                      <th scope="col" class="font-medium px-6 py-4 text-left">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceList.map((student) => {
                      return (
                        <tr className="odd:bg-gray-100 even:bg-white">
                          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                            {student.studentid}
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                            {student.name}
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                            {student.location}
                          </td>
                        </tr>
                      );
                    }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center italic"> No Data Found </p>
      ) : <Loader />}
    </div>
  );
};
