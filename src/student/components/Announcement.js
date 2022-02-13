import axios from "axios";
import React, { useEffect, useState } from "react";
import baseurl from "../../config";
import { localStorageKey } from "../../utils/localStorageKey";

const AnnouncementItem = ({ data }) => {
  return (
    <div className="my-8">
      <h2 className="text-xl text-center my-4">22 January</h2>
      <div className="bg-orange-500 mx-52 py-4 rounded-3xl">
        <h1 className="text-2xl text-center my-2 mx-16 bg-white py-4 rounded-2xl">
          {data.title}
        </h1>
        <h2 className="text-2xl text-center mx-52">{data.subTitle}</h2>
      </div>
    </div>
  );
};

export const Announcement = () => {
  const [announcement, setAnnouncement] = useState(null);

  const data = [
    {
      title: "Mess Off!",
      subTitle:
        "This is to inform everyone that the mess will remain closed tomorrow morning and afternoon! Normal timings for evening snacks and dinner.",
    },
    {
      title: "Service tomorrow!",
      subTitle:
        "This is to inform everyone that the carpenter will be available tomorrow from 12 noon to 5 PM. Hence, everyone is requested to get their furniture’s service done.",
    },
    {
      title: "No Volleyball tomorrow",
      subTitle:
        "This is to inform everyone that the volleyball court is undergoing regular maintenance till tomorrow. Hence, everyone is requested to go to the sports ground for the same.",
    },
  ];

  const getAnnouncementList = async () => {
    const student = await axios.get(
      `${baseurl}/student/announcement`,
      {
        studentid: "1065",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
      }
    );
    console.log(student);
  };

  useEffect(() => {
    getAnnouncementList();
  }, []);

  return (
    <div className="">
      <h1 className="text-5xl text-center my-16">Announcements</h1>
      {data.map((item, index) => {
        return <AnnouncementItem data={item} key={index} />;
      })}
    </div>
  );
};
