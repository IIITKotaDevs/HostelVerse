import React, { useEffect, useState } from "react";
import { localStorageKey } from "../utils/localStorageKey";
import { useStudentAttendanceList } from "../queries/hooks";
import Loader from "../components/Loader";
import TextField from '@mui/material/TextField';

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
      <div className="mx-auto mb-8 w-1/2 bg-white rounded-lg shadow-md">
        <TextField
          id="filled"
          label="Search by Name"
          variant="outlined"
          onChange={(e) => {
            filter(e.target.value)
          }}
          size='small'
          className="w-full"
        />
      </div>
      {attendanceList ? attendanceList?.length > 0 ? (
        <div className="flex flex-col mx-32">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-3xl">
                <table className="w-full">
                  <thead className="bg-gray-700 text-white border-b">
                    <tr>
                      <th scope="col" className="font-medium px-6 py-4 text-left">
                        Student ID
                      </th>
                      <th scope="col" className="font-medium px-6 py-4 text-left">
                        Name
                      </th>
                      <th scope="col" className="font-medium px-6 py-4 text-left">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceList.map((student) => {
                      return (
                        <tr className="odd:bg-gray-100 even:bg-white">
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                            {student.studentid}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
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
