import axios from "axios";
import React, { useEffect, useState } from "react";
import baseurl from "../config";

export const Attendes = () => {
  const [atendees, setAtendees] = useState([]);

  const getAttendance = () => {
    axios
      .get(`${baseurl}/warden/studentAttendence`)
      .then((response) => console.log(response));
  };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <div>
      <p className="font-bold text-3xl text-center mt-12 mb-8">Room Issues</p>
      <div className="flex gap-4 flex-col"></div>
    </div>
  );
};
