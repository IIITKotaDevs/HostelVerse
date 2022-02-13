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
                                                className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => navigate("/student/hostels")}
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
                                                className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => navigate(`/${location.pathname.split("/")[1]}/hostels`)}
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
                                                className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => navigate("/admin/warden-list")}
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
                                                className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => navigate("/student/dashboard")}
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
                                                className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
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
                                                className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => navigate("/student/leave")}
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
                                                className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => navigate("/warden/leave-applications")}
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
                                                className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => navigate("/student/issue")}
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
                                                className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => navigate("/warden/room-issues")}
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
                                                className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => navigate("/student/announcement")}
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
                                                className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => navigate("/warden/put-announcement")}
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
                                                className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => navigate("/admin/create-warden")}
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
                                                className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => navigate("/student/feedback")}
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
                                                className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => navigate(`/${location.pathname.split("/")[1]}/feedback`)}
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
                                            className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                            onClick={() => navigate(`/${location.pathname.split("/")[1]}/profile`)}
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
                                            className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
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