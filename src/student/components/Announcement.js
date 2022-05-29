import axios from "axios";
import React, { useEffect, useState } from "react";
import baseurl from "../../config";
import { localStorageKey } from "../../utils/localStorageKey";

const AnnouncementItem = (item) => {
  const { heading, message, createdAt } = item.data;
  return (
    <div className="my-8">
      <h2 className="text-md text-center my-4">{createdAt.substring(0, 10)}</h2>
      <div className="bg-black py-4 rounded-3xl w-96 mx-auto">
        <h1 className="text-2xl text-center my-2 mx-auto  text-yellow-500 py-4 rounded-2xl">
          {heading}
        </h1>
        <h2 className="text-xl text-yellow-500 text-center mx-auto px-12">
          {message}
        </h2>
      </div>
    </div>
  );
  return null;
};

export const Announcement = () => {
  const [announcement, setAnnouncement] = useState([]);

  const getAnnouncementList = async () => {
    const announcements = await axios.get(`${baseurl}/getAnnouncements`, {
      params: {
        studentid: localStorage.getItem(localStorageKey.id),
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          localStorageKey.jwtToken
        )}`,
        "Content-type": "application/json",
      },
    });
    setAnnouncement(announcements.data.data);
  };

  useEffect(() => {
    getAnnouncementList();
  }, []);

  return (
    <div className="">
      <h1 className="text-5xl text-center my-16">Announcements</h1>
      {announcement.map((item, index) => {
        return <AnnouncementItem data={item} key={index} />;
      })}
    </div>
  );
};
