import React from "react";
import { useAnnouncementList } from "../../queries/hooks";
import { localStorageKey } from "../../utils/localStorageKey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import Loader from '../../components/Loader';

const AnnouncementItem = (item) => {
  const { heading, message, createdAt } = item.data;
  return (
    <div className="my-2 bg-gray-800 w-1/3 rounded-3xl shadow-xl">
      <p className="text-sm font-medium text-right px-6 text-gray-100 py-3">{(new Date(createdAt)).toDateString()}, {(new Date(createdAt)).toLocaleTimeString()}</p>
      <div className="bg-white rounded-t-3xl rounded-b-2xl px-6 py-6">
        <p className="text-lg font-semibold text-black">{heading}</p>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export const Announcement = () => {
  const announcementList = useAnnouncementList({
    studentid: localStorage.getItem(localStorageKey.id),
  });

  return (
    <>
      {announcementList?.data?.data ?
        <div className="bg-green-50 h-screen pt-12">
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 p-3 rounded-full border-4 border-gray-300 shadow-lg">
              <FontAwesomeIcon icon={solid("bullhorn")} size="2x" className="text-blue-500 rounded-full" />
            </div>
            <h1 className="text-3xl font-bold mt-2 text-gray-800">Announcements</h1>
          </div>
          {announcementList?.data?.data?.length > 0 ? <div className="flex flex-wrap justify-center mt-8">
            {announcementList?.data?.data?.map((item, index) => {
              return <AnnouncementItem data={item} key={index} />;
            })}
          </div>
            :
            <div className="flex flex-col items-center">
              <p>No announcements yet</p>
            </div>}
        </div> : <Loader />}
    </>
  );
};
