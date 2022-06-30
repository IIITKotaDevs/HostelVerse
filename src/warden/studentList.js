import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localStorageKey } from "../utils/localStorageKey";
import { useStudentList } from "../queries/hooks";
import person from '../assets/img/person.jpg'
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import Loader from "../components/Loader";

export default function StudentList() {
  const [studentListData, setStudentListData] = useState([]);
  const navigate = useNavigate();

  const studentList = useStudentList({
    wardenid: localStorage.getItem(localStorageKey.id),
  });

  const baseUrl = "https://hostelverse-backend.azurewebsites.net/api";

  const handleRemoveStudent = async (id) => {
    const response = await fetch(baseUrl + `/removeStudent` + `?studentid=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(localStorageKey.token)}`,
      },
    });
    if (response.status === 200) {
      studentList.refetch();
    }
  }

  useEffect(() => {
    setStudentListData(studentList.data?.data);
  }, [studentList.isSuccess === true, studentList.data?.data]);

  const filter = (name) => {
    const filteredData = studentList.data?.data.filter((student) => {
      return student.profile.name.toLowerCase().includes(name.toLowerCase()) || student.profile.studentid.toLowerCase().includes(name.toLowerCase());
    });
    setStudentListData(filteredData);
  }

  return (
    <div className={`min-h-screen bg-gray-75`}>
      <p className="font-bold text-3xl text-center pt-12 pb-8">Student List</p>
      <div className="mx-auto mb-8 w-1/2 bg-white p-2 rounded-lg shadow-md">
        <TextField
          id="filled"
          label="Search by Name or Student ID"
          variant="outlined"
          onChange={(e) => {
            filter(e.target.value)
          }}
          size='small'
          className="w-full"
        />
      </div>
      {studentListData ? (
        <div className="flex flex-wrap justify-center gap-8 pb-8">
          {studentListData?.length > 0 ? studentListData?.map((student, index) => {
            return (
              <div key={student?.profile?.studentid} className="w-1/5 rounded-lg shadow-lg overflow-hidden bg-white py-8 px-12 divide-y-2">
                <div className="w-full flex flex-col items-center pb-4">
                  <div className="rounded-full overflow-hidden w-24 h-24 shadow-2xl">
                    <img src={student?.profile?.picture || person} alt="" className="w-auto h-24 object-cover" />
                  </div>
                  <p className="pt-4 font-bold text-xl hover:text-primary transition-all cursor-pointer" onClick={() => { navigate(`/student-detail/${student?.profile?.studentid}`) }}>{student?.profile?.name}</p>
                  <p className="text-xs text-gray-600 font-semibold font-roboto">{student?.profile?.studentid}</p>
                  <div className="text-xs font-roboto flex gap-1 items-center text-gray-400">
                    <FontAwesomeIcon icon={solid('house')} className="w-3 h-3" />
                    <p className="font-semibold text-sm text-gray-400">{student?.roomid}</p>
                  </div>
                </div>
                <div className="w-full justify-center items-center py-4 text-gray-700 flex gap-4">
                  {student?.profile?.contactno ? <FontAwesomeIcon className="cursor-pointer" icon={solid('phone')} onClick={() => { window.location.href = `tel:${student?.profile?.contactno}` }} /> : null}
                  {student?.profile?.email ? <FontAwesomeIcon className="cursor-pointer" icon={solid('envelope')} onClick={() => { window.location.href = `mailto:${student?.profile?.email}` }} /> : null}
                  {student?.profile?.instagramHandle ? <FontAwesomeIcon className="cursor-pointer" icon={brands("instagram")} onClick={() => { window.location.href = student?.profile?.instagramHandle }} /> : null}
                  {student?.profile?.linkedinHandle ? <FontAwesomeIcon className="cursor-pointer" icon={brands('linkedin-in')} onClick={() => { window.location.href = student?.profile?.linkedinHandle }} /> : null}
                  {student?.profile?.githubHandle ? <FontAwesomeIcon className="cursor-pointer" icon={brands('github')} onClick={() => { window.location.href = student?.profile?.githubHandle }} /> : null}
                  {student?.profile?.twitterHandle ? <FontAwesomeIcon className="cursor-pointer" icon={brands('twitter')} onClick={() => { window.location.href = student?.profile?.twitterHandle }} /> : null}
                </div>
                <div className={`w-full flex ${localStorage.getItem(localStorageKey.role) === 'admin' ? 'justify-between' : 'flex-col items-center'} pt-4`}>
                  <button className="cursor-pointer bg-green-500 px-4 py-1 font-mono uppercase rounded font-semibold text-white text-sm">Chat</button>
                  {localStorage.getItem(localStorageKey.role) === 'admin' ?
                    <button className="cursor-pointer bg-red-500 px-4 py-1 font-mono uppercase rounded font-semibold text-white text-sm"
                      onClick={() => {
                        handleRemoveStudent(student?.profile?.studentid);
                      }}
                    >Remove</button>
                    : null}
                </div>
              </div>
            );
          }) : <p className="italic text-center">No students under this warden with the given name or roll number.</p>}
        </div>
      ) : <Loader />}
    </div >
  );
}
