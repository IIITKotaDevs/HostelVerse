import axios from "axios";
import React, { useEffect, useState } from "react";
import baseurl from "../config";
import { localStorageKey } from "../utils/localStorageKey";
import { useStudentAttendanceList } from "../queries/hooks";

export const Attendes = () => {
  const studentAttendanceList = useStudentAttendanceList({
    wardenid: localStorage.getItem(localStorageKey.id),
  });

  console.log(studentAttendanceList);

  return (
    <div>
      <p className="font-bold text-3xl text-center mt-12 mb-8">Check In / Out Log</p>
      <div className="flex gap-4 flex-col">{studentAttendanceList?.data?.length > 0 || 'Empty'}</div>
    </div>
  );
};
