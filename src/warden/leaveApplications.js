import React, { useState, Fragment, useEffect } from "react";
import { localStorageKey } from "../utils/localStorageKey";
import { TextField } from "@material-ui/core";
import { useLeaveApplicationList } from "../queries/hooks";
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import Loader from "../components/Loader";
import { useMutateUpdateLeaveApplication } from "../queries/mutations";

export default function LeaveApplications() {
  const [resolveStatus, SetResolveStatus] = useState(false);
  const [boxIndex, setBoxIndex] = useState(undefined);
  const [reason, setReason] = useState("");
  const [resolved, setResolved] = useState(false);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const { mutateAsync: updateLeaveApplication } = useMutateUpdateLeaveApplication({
    onSuccess: () => {
      setMessage("Leave Application Resolved Successfully");
      setResolved(true);
    },
    onError: () => { }
  });

  const leaveApplicationList = useLeaveApplicationList({
    wardenid: localStorage.getItem(localStorageKey.id),
  });

  useEffect(() => {
    leaveApplicationList.refetch();
  }, [resolved]);

  return (
    <div className="my-12">
      {leaveApplicationList?.data ?
        <div>
          <p className="font-bold text-3xl text-center mb-8">
            Leave Applications
          </p>
          <div className="grid grid-cols-3 gap-6 mx-32">
            {leaveApplicationList?.data?.message?.filter((e) => e.status === "Pending")?.length > 0 ? leaveApplicationList?.data?.message?.filter((e) => e.status === "Pending")?.map((application, index) => {
              return (
                <div className="rounded-2xl shadow-xl" key={index}>
                  <div className="bg-gray-800 flex justify-between items-center pb-10 rounded-2xl">
                    <p className="text-sm font-medium text-right px-6 text-gray-100 py-3">{(new Date(application.date_from)).toDateString()}</p>
                    <FontAwesomeIcon className="text-white" icon={solid('arrow-right')} />
                    <p className="text-sm font-medium text-right px-6 text-gray-100 py-3">{(new Date(application.date_to)).toDateString()}</p>
                  </div>
                  <div className="bg-white rounded-2xl px-6 py-6 -mt-10">
                    <pre className="text-gray-900 font-nunito">{application.message}</pre>
                    <p className="font-medium text-xs text-gray-700 text-right">~ {application.studentid}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-green-500 text-white px-4 py-1 rounded-lg text-sm"
                        onClick={() => {
                          SetResolveStatus(true);
                          setBoxIndex(index);
                          openModal();
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded-lg text-sm"
                        onClick={() => {
                          SetResolveStatus(false);
                          setBoxIndex(index);
                          openModal();
                        }}
                      >
                        Reject
                      </button>
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
                                      {resolveStatus ? "Approval" : "Rejection"} Reason
                                    </Dialog.Title>
                                    <div
                                      className={` mx-auto my-6 `}
                                    >
                                      <div className="text-center ">
                                        <TextField
                                          id="reason"
                                          label="Reason"
                                          type="text"
                                          variant="outlined"
                                          onChange={(e) => setReason(e.target.value)}
                                          className="shadow-md w-full"
                                        />
                                      </div>
                                    </div>

                                    <div className="flex justify-evenly items-center w-full text-sm">
                                      <button
                                        className="bg-blue-600 hover:bg-blue-800 transition-all text-white rounded-md px-4 py-1"
                                        onClick={() => {
                                          updateLeaveApplication({
                                            studentid: application.studentid,
                                            wardenid: localStorage.getItem(localStorageKey.id),
                                            name: application.name,
                                            status: resolveStatus ? "Approved" : "Rejected",
                                            remarks: reason,
                                          })
                                          setTimeout(() => {
                                            closeModal();
                                          }, 5000);
                                        }}
                                      >
                                        Submit
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
                </div>
              );
            }) : <div className="italic text-center col-span-3">Hurray! No leave applications to resolve. Please check back later.</div>}
          </div >

          {leaveApplicationList?.data?.message?.filter((e) => e.status === "Approved").length > 0 ?
            <div>
              <p className="font-semibold text-green-700 text-2xl text-center mt-12 mb-4">Recent Approved</p>
              <div className="grid grid-cols-3 gap-6 mx-32">
                {leaveApplicationList?.data?.message?.filter((e) => e.status === "Approved")?.map((application, index) => {
                  return (
                    <div className="bg-gray-800 rounded-2xl shadow-xl" key={index}>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-right px-6 text-gray-100 py-3">{(new Date(application.date_from)).toDateString()}</p>
                        <FontAwesomeIcon className="text-white" icon={solid('arrow-right')} />
                        <p className="text-sm font-medium text-right px-6 text-gray-100 py-3">{(new Date(application.date_to)).toDateString()}</p>
                      </div>
                      <div className="bg-white px-6 py-4">
                        <pre className="text-gray-900 font-nunito">{application.message}</pre>
                        <p className="font-medium text-xs text-gray-700 text-right">~ {application.studentid}</p>
                      </div>
                      <p className="text-sm text-white py-2 px-4"><span className="font-normal text-gray-300"><FontAwesomeIcon icon={solid('note-sticky')} /> </span>&nbsp;{application.remarks}</p>
                    </div>
                  )
                }
                )}
              </div>
            </div> : null}

          {leaveApplicationList?.data?.message?.filter((e) => e.status === "Rejected")?.length > 0 ?
            <div>
              <p className="font-semibold text-red-700 text-2xl text-center mt-12 mb-4">Recent Rejected</p>
              <div className="grid grid-cols-3 gap-6 mx-32">
                {leaveApplicationList?.data?.message?.filter((e) => e.status === "Rejected")?.map((application, index) => {
                  return (
                    <div className="bg-gray-800 rounded-2xl shadow-xl" key={index}>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-right px-6 text-gray-100 py-3">{(new Date(application.date_from)).toDateString()}</p>
                        <FontAwesomeIcon className="text-white" icon={solid('arrow-right')} />
                        <p className="text-sm font-medium text-right px-6 text-gray-100 py-3">{(new Date(application.date_to)).toDateString()}</p>
                      </div>
                      <div className="bg-white px-6 py-4">
                        <pre className="text-gray-900 font-nunito">{application.message}</pre>
                        <p className="font-medium text-xs text-gray-700 text-right">~ {application.studentid}</p>
                      </div>
                      <p className="text-sm text-white py-2 px-4"><span className="font-normal text-gray-300"><FontAwesomeIcon icon={solid('note-sticky')} /> </span>&nbsp;{application.remarks}</p>
                    </div >
                  )
                }
                )}
              </div>
            </div> : null}
        </div>
        : <Loader />
      }
    </div >
  );
}