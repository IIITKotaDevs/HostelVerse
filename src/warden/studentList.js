import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localStorageKey } from "../utils/localStorageKey";
import { useStudentList } from "../queries/hooks";
import person from '../assets/img/person.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function StudentList() {
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();

  const studentList = useStudentList({
    wardenid: localStorage.getItem(localStorageKey.id),
  });

  const baseUrl = "https://hostelverse-backend.azurewebsites.net/api";

  useEffect(() => {
    studentList.refetch();
    setRefetch(false);
  }, [refetch === true]);

  const handleRemoveStudent = async (id) => {
    const response = await fetch(baseUrl + "/removeStudent" + `?studentid=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(localStorageKey.token)}`,
      },
    });
    if (response.status === 200) {
      setRefetch(true);
    }
  }

  return (
    <div className="bg-gray-75">
      <p className="font-bold text-3xl text-center pt-12 pb-8">Student List</p>
      <div className="flex flex-wrap justify-center gap-8 pb-8">
        {studentList?.data?.data?.length > 0 ? studentList?.data?.data?.map((student, index) => {
          return (
            <div key={student?.profile?.studentid} className="w-1/5 rounded-lg shadow-lg overflow-hidden bg-white py-8 px-12 divide-y-2" onClick={() => { navigate(`/student-detail/${student?.profile?.studentid}`) }}>
              <div className="w-full flex flex-col items-center pb-4">
                <img src={person} alt="" className="items-center w-24 rounded-full shadow-2xl" />
                <p className="pt-4 font-bold text-xl">{student?.profile?.name}</p>
                <p className="text-xs text-gray-600 font-semibold font-roboto">{student?.profile?.studentid}</p>
                <div className="text-xs font-roboto flex gap-1 items-center text-gray-400">
                  <FontAwesomeIcon icon={solid('house')} className="w-3 h-3" />
                  <p className="font-semibold text-sm text-gray-400">{student?.roomid}</p>
                </div>
              </div>
              <div className="w-full justify-center items-center py-4 text-gray-700 flex gap-4">
                <FontAwesomeIcon className="cursor-pointer" icon={solid('phone')} />
                <FontAwesomeIcon className="cursor-pointer" icon={solid('envelope')} />
                <FontAwesomeIcon className="cursor-pointer" icon={brands("instagram")} />
                <FontAwesomeIcon className="cursor-pointer" icon={brands('linkedin-in')} />
                <FontAwesomeIcon className="cursor-pointer" icon={brands('github')} />
              </div>
              <div className={`w-full flex ${localStorage.getItem(localStorageKey.role) === 'admin' ? 'justify-between' : 'flex-col items-center'} pt-4`}>
                <button className="cursor-pointer bg-green-500 px-4 py-1 font-mono uppercase rounded font-semibold text-white text-sm">Chat</button>
                {localStorage.getItem(localStorageKey.role) === 'admin' ?
                  <button className="cursor-pointer bg-red-500 px-4 py-1 font-mono uppercase rounded font-semibold text-white text-sm"
                    onClick={() => {
                      handleRemoveStudent(student?.profile?.studentid);
                      setRefetch(true);
                    }}
                  >Remove</button>
                  : null}
              </div>
            </div>
          );
        }) : <p className="italic text-center">No students under this warden yet.</p>}
      </div>
    </div >
  );
}
