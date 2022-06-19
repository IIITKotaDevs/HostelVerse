import React, { useState, Fragment, useEffect } from "react";
import { localStorageKey } from "../utils/localStorageKey";
import { useRoomIssueList } from "../queries/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useMutateResolveRoomIssue } from "../queries/mutations";
import Loader from "../components/Loader";
import { Dialog, Transition } from '@headlessui/react'
import { TextField } from "@material-ui/core";
import { Tab } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function RoomIssuesList() {
  const [message, setMessage] = useState("");
  const [boxIndex, setBoxIndex] = useState(undefined);
  const [isOpen, setIsOpen] = useState(true);
  const [assignedTo, setAssignedTo] = useState("");
  const [assignedPhone, setAssignedPhone] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [error, setError] = useState([]);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  var errorLength = 0;

  const validate = () => {
    errorLength = 0;
    setError([]);
    if (!expectedDate) {
      setError(error => [...error, { type: "expectedDate", message: "Expected Completion Date is required" }]);
      errorLength++;
    }
    // Check if start date is less than current date
    if (expectedDate.length === 10 && new Date(expectedDate) <= new Date()) {
      setError(error => [...error, { type: "expectedDate", message: "Expected Completion Date must not be less than current date" }]);
      errorLength++;
    }
    if (!assignedTo) {
      setError(error => [...error, { type: "assignedTo", message: "Assigned To is required" }]);
      errorLength++;
    }
    if (!assignedPhone) {
      setError(error => [...error, { type: "assignedPhone", message: "Assigned Phone Number is required" }]);
      errorLength++;
    }
    if (assignedPhone.length > 0 && assignedPhone.length !== 10) {
      setError((error) => [
        ...error,
        { type: "assignedPhone", message: "Assigned Phone Number must be only of 10 digits" },
      ]);
      errorLength++;
    }
    if (assignedPhone.length > 0 && assignedPhone.match(/^[0-9]+$/) === null) {
      setError((error) => [
        ...error,
        { type: "assignedPhone", message: "Assigned Phone Number must contain only numbers" },
      ]);
      errorLength++;
    }

    if (errorLength === 0) {
      return true;
    }
    return false;
  };

  const { mutateAsync: ResolveRoomIssueData } = useMutateResolveRoomIssue({
    onSuccess: () => {
      roomIssueList.refetch();
      setMessage("");
      setBoxIndex(undefined);
      setAssignedTo("");
      setAssignedPhone("");
      setExpectedDate("");
    },
    onError: () => { },
  });

  const roomIssueList = useRoomIssueList({
    wardenid: localStorage.getItem(localStorageKey.id),
  });

  const tabHeadings = ['Pending', 'Assigned', 'Resolved'];

  return (
    <>

      {roomIssueList.data ?
        <div>
          <p className="font-bold text-3xl text-center mt-12 mb-8">Room Issues</p>
          <div className="mx-32 px-2 py-4 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-gray-700 p-1">
                {tabHeadings.map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-semibold leading-5 transition duration-150 ease-in-out',
                        selected
                          ? 'bg-white shadow'
                          : 'text-white hover:bg-white/[0.12] hover:text-white'
                      )}
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {tabHeadings.map((category, index) => (
                  <Tab.Panel
                    key={index}
                    className={classNames(
                      'rounded-xl bg-white p-3',
                    )}
                  >
                    <div className="grid grid-cols-3 items-stretch gap-4 mb-8">
                      {roomIssueList.data?.filter((e) => e.status === category)?.length > 0 ? roomIssueList?.data?.filter((e) => e.status === category)?.map((issues, index) => (
                        <div className="rounded-2xl overflow-hidden shadow-xl" key={index}>
                          <p className="bg-gray-800 text-sm font-medium text-right px-6 text-gray-100 py-3 pb-10">{(new Date(issues.created_at)).toDateString()}, {(new Date(issues.created_at)).toLocaleTimeString()}</p>
                          <div className="bg-white rounded-2xl px-6 py-4 -mt-8">
                            <div className="flex justify-between">
                              <div className="flex gap-2 items-center">
                                <FontAwesomeIcon icon={solid('house')} className="text-gray-700 text-sm" />
                                <p className="font-medium">{issues.roomno}</p>
                              </div>
                              <div className="flex gap-2 items-center">
                                <FontAwesomeIcon icon={solid('building')} className="text-gray-700 text-sm" />
                                <p className="font-medium">{issues.hostelid}</p>
                              </div>
                            </div>
                            <pre className="text-gray-900 font-nunito whitespace-pre-wrap mt-2">{issues.remarks}</pre>
                            <div className="flex justify-between">
                              {category !== "Resolved" ? <button
                                className="bg-blue-500 hover:bg-blue-700 transition-all text-sm text-white px-4 py-1 rounded-lg mt-4"
                                onClick={(e) => {
                                  setBoxIndex(index);
                                  openModal();
                                }}
                              >
                                Assign
                              </button>
                                : null}
                              {category === "Assigned" ? <button
                                className="bg-green-500 hover:bg-green-700 transition-all text-sm text-white px-4 py-1 rounded-lg mt-4"
                                onClick={() => {
                                  ResolveRoomIssueData({
                                    id: issues._id,
                                    hostelid: issues.hostelid,
                                    roomno: issues.roomno,
                                    status: "Resolved",
                                    assigned_person: "",
                                    expected_completion_date: "",
                                    contact_no: "",
                                  })
                                }}
                              >
                                Resolved
                              </button>
                                : null}
                            </div>
                          </div>
                          {
                            boxIndex === index && (
                              <Transition appear show={isOpen} as={Fragment}>
                                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                                  <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                                  </Transition.Child>

                                  <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                      <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                      >
                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                          <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium text-center text-gray-900"
                                          >
                                            Assign Person to Resolve Complaint
                                          </Dialog.Title>
                                          <div
                                            className={` mx-auto my-6 `}
                                          >
                                            <div className="flex flex-col gap-4">
                                              <div>
                                                <TextField
                                                  id="expectedDate"
                                                  label="Expected Completion Date"
                                                  type="date"
                                                  value={expectedDate}
                                                  onChange={(e) => setExpectedDate(e.target.value)}
                                                  InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                                  className="w-full"
                                                />
                                                {error.length > 0
                                                  ? error.map((item, index) => {
                                                    if (item.type === "expectedDate") {
                                                      return (
                                                        <p className="text-red-500 text-xs" key={index}>
                                                          {item.message}
                                                        </p>
                                                      );
                                                    }
                                                  })
                                                  : null}
                                              </div>
                                              <div>
                                                <TextField
                                                  id="assignedTo"
                                                  label="Assigned To"
                                                  type="text"
                                                  variant="outlined"
                                                  onChange={(e) => setAssignedTo(e.target.value)}
                                                  className="shadow-md w-full"
                                                />
                                                {error.length > 0
                                                  ? error.map((item, index) => {
                                                    if (item.type === "assignedTo") {
                                                      return (
                                                        <p className="text-red-500 text-xs" key={index}>
                                                          {item.message}
                                                        </p>
                                                      );
                                                    }
                                                  })
                                                  : null}
                                              </div>
                                              <div>
                                                <TextField
                                                  id="assignedPhone"
                                                  label="Assigned Phone Number"
                                                  type="text"
                                                  variant="outlined"
                                                  onChange={(e) => setAssignedPhone(e.target.value)}
                                                  className="shadow-md w-full"
                                                />
                                                {error.length > 0
                                                  ? error.map((item, index) => {
                                                    if (item.type === "assignedPhone") {
                                                      return (
                                                        <p className="text-red-500 text-xs" key={index}>
                                                          {item.message}
                                                        </p>
                                                      );
                                                    }
                                                  })
                                                  : null}
                                              </div>
                                            </div>
                                          </div>

                                          <div className="flex justify-evenly items-center w-full text-sm">
                                            <button
                                              className="bg-blue-600 hover:bg-blue-800 transition-all text-white rounded-md px-4 py-1"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                validate() && ResolveRoomIssueData({
                                                  id: issues._id,
                                                  hostelid: issues.hostelid,
                                                  roomno: issues.roomno,
                                                  status: "Assigned",
                                                  assigned_person: assignedTo,
                                                  expected_completion_date: expectedDate,
                                                  contact_no: assignedPhone,
                                                })
                                              }}
                                            >
                                              Assign
                                            </button>
                                            <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 transition-all text-white rounded-md px-4 py-1">Cancel</button>
                                          </div>
                                          <span className="text-green-500 italic text-center">{message}</span>
                                        </Dialog.Panel>
                                      </Transition.Child>
                                    </div>
                                  </div>
                                </Dialog>
                              </Transition>
                            )
                          }
                        </div>
                      )) : <div className="text-center w-full col-span-3 italic">No {category} Issues</div>}
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
        : <Loader />
      }
    </>
  );
}
