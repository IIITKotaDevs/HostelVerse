import React, { useEffect, useState } from "react";
import { useAnnouncementList } from "../../queries/hooks";
import { localStorageKey } from "../../utils/localStorageKey";

const AnnouncementItem = (item) => {
  const { heading, message, createdAt } = item.data;
  return (
    <div className="my-2 bg-gray-800 w-1/2 rounded-3xl shadow-xl">
      <p className="text-sm font-medium text-right px-6 text-gray-100 py-3">{(new Date(createdAt)).toDateString()}, {(new Date(createdAt)).toLocaleTimeString()}</p>
      <div className="bg-white rounded-3xl px-6 py-6">
        <p className="text-lg font-semibold text-black">{heading}</p>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export const Announcement = () => {
  // const [announcement, setAnnouncement] = useState([]);

  const announcementList = useAnnouncementList({
    studentid: localStorage.getItem(localStorageKey.id),
  });

  return (
    <div className="bg-green-50 h-screen">
      <h1 className="text-5xl text-center pt-16 pb-8">Announcements</h1>
      <div className="flex flex-col items-center">
        {announcementList?.data?.data?.map((item, index) => {
          return <AnnouncementItem data={item} key={index} />;
        })}
      </div>
    </div>
  );
};
