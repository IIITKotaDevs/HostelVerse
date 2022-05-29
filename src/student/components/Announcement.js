import axios from "axios";
import React, { useEffect, useState } from "react";
import baseurl from "../../config";
import { localStorageKey } from "../../utils/localStorageKey";

const AnnouncementItem = ({ heading, message }) => {
  return (
    <div className="my-8">
      <h2 className="text-xl text-center my-4">22 January</h2>
      <div className="bg-orange-500 mx-52 py-4 rounded-3xl">
        <h1 className="text-2xl text-center my-2 mx-16 bg-white py-4 rounded-2xl">
          {heading}
        </h1>
        <h2 className="text-2xl text-center mx-52">{message}</h2>
      </div>
    </div>
  );
};

export const Announcement = () => {
  const [announcement, setAnnouncement] = useState(null);

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
    console.log(announcements.data);
    setAnnouncement(announcements.data);
  };

  useEffect(() => {
    getAnnouncementList();
  }, []);

  return (
    <div className="">
      {/* <h1 className="text-5xl text-center my-16">Announcements</h1>
      {announcement.map((item, index) => {
        return <AnnouncementItem data={item} key={index} />;
      })} */}
    </div>
  );
};
