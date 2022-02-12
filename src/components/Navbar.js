import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { localStorageKey } from "../utils/localStorageKey";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const doLogOut = () => {
    localStorage.removeItem(localStorageKey.name);
    localStorage.removeItem(localStorageKey.jwtToken);
    localStorage.removeItem(localStorageKey.contactNo);
    localStorage.removeItem(localStorageKey.role);
    localStorage.removeItem(localStorageKey.name);
    localStorage.removeItem(localStorageKey.email);

    navigate("/");
  };

  if (
    location.pathname === "/" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/sign-in" ||
    location.pathname === "/otp"
  )
    return null;
  else {
    return (
      <div className="bg-primary2 fixed top-4 right-16">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium bg-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Menu
              <FontAwesomeIcon
                icon={solid("angle-down")}
                className="w-5 h-5 ml-2 -mr-1 text-primary2 hover:text-primary"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {location.pathname.split("/")[1] === "student" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => navigate("/hostels")}
                      >
                        <FontAwesomeIcon
                          icon={solid("building")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        Hostels
                      </button>
                    )}
                  </Menu.Item>
                ) : null}
                {location.pathname.split("/")[1] === "warden" ||
                location.pathname.split("/")[1] === "admin" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("users")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        Student List
                      </button>
                    )}
                  </Menu.Item>
                ) : null}
                {location.pathname.split("/")[1] === "admin" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("person-dress")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        Warden List
                      </button>
                    )}
                  </Menu.Item>
                ) : null}
                {location.pathname.split("/")[1] === "student" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("cart-shopping")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        Payments
                      </button>
                    )}
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("cart-shopping")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        All Payments
                      </button>
                    )}
                  </Menu.Item>
                )}
                {location.pathname.split("/")[1] === "student" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("clock")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        Check In / Out
                      </button>
                    )}
                  </Menu.Item>
                ) : location.pathname.split("/")[1] === "warden" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("clipboard-list")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        Check In / Out Log
                      </button>
                    )}
                  </Menu.Item>
                ) : null}
                {location.pathname.split("/")[1] === "student" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("envelope")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        Apply Leave
                      </button>
                    )}
                  </Menu.Item>
                ) : location.pathname.split("/")[1] === "warden" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("envelopes-bulk")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        Leave Applications
                      </button>
                    )}
                  </Menu.Item>
                ) : null}
                {location.pathname.split("/")[1] === "student" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("triangle-exclamation")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        Room Complaint
                      </button>
                    )}
                  </Menu.Item>
                ) : location.pathname.split("/")[1] === "warden" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("triangle-exclamation")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        Room Complaints
                      </button>
                    )}
                  </Menu.Item>
                ) : null}
                {location.pathname.split("/")[1] === "student" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("bullhorn")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        Announcement
                      </button>
                    )}
                  </Menu.Item>
                ) : location.pathname.split("/")[1] === "warden" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("bullhorn")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        Put Announcement
                      </button>
                    )}
                  </Menu.Item>
                ) : null}
                {location.pathname.split("/")[1] === "admin" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("pen")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        Create Warden
                      </button>
                    )}
                  </Menu.Item>
                ) : null}
              </div>
              <div className="px-1 py-1">
                {location.pathname.split("/")[1] === "student" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("comment")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        Feedback
                      </button>
                    )}
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FontAwesomeIcon
                          icon={solid("comment")}
                          className="w-5 h-5 mr-2 text-primary"
                          aria-hidden="true"
                        />
                        View Feedbacks
                      </button>
                    )}
                  </Menu.Item>
                )}
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <FontAwesomeIcon
                        icon={solid("user")}
                        className="w-5 h-5 mr-2 text-primary"
                        aria-hidden="true"
                      />
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={() => doLogOut()}
                    >
                      <FontAwesomeIcon
                        icon={solid("right-from-bracket")}
                        className="w-5 h-5 mr-2 text-primary"
                        aria-hidden="true"
                      />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
  }
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArchiveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function ArchiveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

function DeleteInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}
