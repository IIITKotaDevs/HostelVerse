import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { localStorageKey } from "../utils/localStorageKey";
import { useStudentListAdmin } from "../queries/hooks";
import Loader from "../components/Loader";
import person from "../assets/img/person.jpg";
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox, Transition } from "@headlessui/react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function StudentListAdmin() {
  const [studentListData, setStudentListData] = useState([]);
  const [type, setType] = useState({ name: "Select Warden" });

  const studentList = useStudentListAdmin({
    adminid: localStorage.getItem(localStorageKey.id),
    wardenid: type.name,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setStudentListData(studentList.data?.data);
  }, [studentList.isSuccess === true, studentList.data?.data]);

  const filter = (name) => {
    const filteredData = studentList.data?.data.filter((student) => {
      return student.profile.name.toLowerCase().includes(name.toLowerCase()) || student.profile.studentid.toLowerCase().includes(name.toLowerCase());
    });
    setStudentListData(filteredData);
  }

  const typeOptions = [
    { name: "w1" },
    { name: "w2" },
    { name: "w3" },
    { name: "w4" },
    { name: "w5" },
    { name: "w6" },
  ];

  return (
    <div
      className={`bg-gray-75 min-h-screen ${studentListData && studentListData.length < 5 ? "h-screen" : ""
        } `}
    >
      <p className="font-bold text-3xl text-center pt-12 mb-8">Student List</p>
      <div className="mx-auto w-1/3 bg-white rounded-lg overflow-hidden shadow-md">
        <TextField
          inputProps={{ style: { fontSize: 14, backgroundColor: "white" } }}
          InputLabelProps={{ style: { fontSize: 14 } }}
          id="filled"
          label="Search by Name or Student ID"
          variant="filled"
          onChange={(e) => {
            filter(e.target.value)
          }}
          size='small'
          className="w-full bg-white"
        />
      </div>
      {/* <div className="bg-white w-1/3 rounded-lg mt-2 mb-4 text-sm mx-auto">
        <Listbox value={type} onChange={setType}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-4 pr-10 text-left shadow-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
              <span className="block truncate">{type.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <FontAwesomeIcon
                  icon={solid("angle-down")}
                  className="w-3.5 h-3.5"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {typeOptions.map((type, genderIdx) => (
                  <Listbox.Option
                    key={genderIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${active
                        ? "bg-amber-100 text-primary"
                        : "text-gray-900"
                      }`
                    }
                    value={type}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          {type.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary2">
                            <FontAwesomeIcon
                              icon={solid("check")}
                              className="w-3.5 h-3.5"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div> */}

      {studentListData ? (
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {studentListData.map((student, index) => {
            return (
              <div
                key={student?.profile?.studentid}
                className="w-1/5 rounded-lg shadow-lg overflow-hidden bg-white py-8 px-12 divide-y-2"
              >
                <div className="w-full flex flex-col items-center pb-4">
                  <div className="rounded-full overflow-hidden w-24 h-24 shadow-2xl">
                    <img src={student?.profile?.picture || person} alt="" className="w-auto h-24 object-cover" />
                  </div>
                  <p
                    className="pt-4 font-bold text-xl hover:text-primary transition-all cursor-pointer"
                    onClick={() => {
                      navigate(`/student-detail/${student?.profile?.studentid}`);
                    }}
                  >
                    {student?.profile?.name}
                  </p>
                  <p className="text-xs text-gray-600 font-semibold font-roboto uppercase">
                    {student?.profile?.studentid}
                  </p>
                </div>
                <div className="w-full justify-center items-center py-4 text-gray-700 flex gap-4">
                  {student?.profile?.contactno ? (
                    <FontAwesomeIcon
                      className="cursor-pointer"
                      icon={solid("phone")}
                      onClick={() => {
                        window.location.href = `tel:${student?.profile?.contactno}`;
                      }}
                    />
                  ) : null}
                  {student?.profile?.email ? (
                    <FontAwesomeIcon
                      className="cursor-pointer"
                      icon={solid("envelope")}
                      onClick={() => {
                        window.location.href = `mailto:${student?.profile?.email}`;
                      }}
                    />
                  ) : null}
                </div>
                <div className={`w-full flex justify-between pt-4`}>
                  <button className="cursor-pointer bg-green-500 px-4 py-1 font-mono uppercase rounded font-semibold text-white text-sm">
                    Chat
                  </button>
                  <button
                    className="cursor-pointer bg-red-500 px-4 py-1 font-mono uppercase rounded font-semibold text-white text-sm"
                    onClick={() => {
                      console.log('deleted');
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
