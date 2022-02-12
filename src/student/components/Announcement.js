import React from "react";

const AnnouncementItem = () => {
  return (
    <div className="my-8">
      <h2 className="text-xl text-center my-4">22 January</h2>
      <div className="bg-orange-500 mx-52 py-4 rounded-3xl">
        <h1 className="text-2xl text-center my-2 mx-16 bg-white py-4 rounded-2xl">
          Mess Off!
        </h1>
        <h2 className="text-2xl text-center mx-52">
          This is to inform everyone that the mess will remain closed tomorrow
          morning and afternoon! Normal timings for evening snacks and dinner.
        </h2>
      </div>
    </div>
  );
};

export const Announcement = () => {
  return (
    <div className="">
      <h1 className="text-5xl text-center my-16">Announcements</h1>
      <AnnouncementItem />
    </div>
  );
};
