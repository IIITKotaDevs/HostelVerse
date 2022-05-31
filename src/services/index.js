const baseUrl = "https://hostelverse-backend.azurewebsites.net/api";
import { localStorageKey } from "../utils/localStorageKey";

const apiEndPoints = {
  getStudentDetails: `/getStudentProfile`,
  getHostelList: `/hostelList`,
  getRoomIssueList: `/getRoomIssue`,
  getLeaveApplicationList: `/getLeaveApplications`,
  getStudentList: `/getStudent`,
  getStudentAttendanceList: `/getStudentAttendence`,
  submitCheckIn: `/checkin`,
  submitCheckOut: `/checkout`,
};

export async function getStudentDetails(params) {
  try {
    const res = (
      await fetch(
        baseUrl + apiEndPoints.getStudentDetails + `?studentid=${params.studentid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              localStorageKey.jwtToken
            )}`,
            "Content-type": "application/json",
          },
        }
      ).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getHostelList(params) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.getHostelList + `?low=${params.low}&high=${params.high}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
      }).then((res) => res.json())
    );
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

export async function getHostelDetail(params) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.getHostelList + `?hostelid=${params.hostelid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
      }).then((res) => res.json())
    );
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

export async function getRoomIssueList(params) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.getRoomIssueList + `?wardenid=${params.wardenid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
      }).then((res) => res.json())
    );
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

export async function getLeaveApplicationList(params) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.getLeaveApplicationList + `?wardenid=${params.wardenid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
      }).then((res) => res.json())
    );
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

export async function getStudentList(params) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.getStudentList + `?wardenid=${params.wardenid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
      }).then((res) => res.json())
    );
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

export async function getStudentAttendanceList(params) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.getStudentAttendanceList + `?wardenid=${params.wardenid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
      }).then((res) => res.json())
    );
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

export async function submitCheckIn(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.submitCheckIn + `?studentid=${data.studentid}&location=${data.location.toString()}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        }
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function submitCheckOut(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.submitCheckOut + `?studentid=${data.studentid}&location=${data.location}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        }
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}