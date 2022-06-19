import { localStorageKey } from "../utils/localStorageKey";
const baseUrl = "https://hostelverse-backend.azurewebsites.net/api";

const apiEndPoints = {
  getStudentDetails: `/getStudentProfile`,
  getHostelList: `/hostelList`,
  getRoomIssueList: `/getRoomIssue`,
  getLeaveApplicationList: `/getLeaveApplications`,
  getStudentList: `/getStudent`,
  getStudentAttendanceList: `/getStudentAttendence`,
  getAnnouncementList: `/getAnnouncements`,
  getFeedback: `/getFeedback`,
  getWardenProfile: `/getWardenProfile`,
  signUp: `/student/signup`,
  verifyEmail: `/student/verifyEmail`,
  login: `/login`,
  submitCheckIn: `/checkin`,
  submitCheckOut: `/checkout`,
  submitLeaveApplication: `/createLeaveApplication`,
  submitRoomIssue: `/createRoomIssue`,
  submitFeedback: `/createFeedback`,
  updateStudentProfile: `/updateStudentProfile`,
  updateWardenProfile: `/updateWardenProfile`,
  createAnnouncement: `/createAnnouncement`,
  updateLeaveApplication: `/updateLeaveApplication`,
  resolveRoomIssue: `/resolveRoomIssue`,
  getWardenList: `/getWarden`,
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

export async function getWardenList(params) {
  try {
  	const res = (
  		await fetch(baseUrl + apiEndPoints.getWardenList, {
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
};

export async function getStudentDetailsWarden(params) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.getStudentList + `?studentid=${params.studentid}&wardenid=${params.wardenid}`, {
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

export async function getAnnouncementList(params) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.getAnnouncementList + `?studentid=${params.studentid}`, {
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

export async function getFeedback(params) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.getFeedback + `?studentid=${params.studentid}`, {
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

export async function getWardenProfile(params) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.getWardenProfile + `?wardenid=${params.wardenid}`, {
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

export async function signUp(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.signUp, {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function verifyEmail(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.verifyEmail, {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json())
    )
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function login(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.login, {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function submitCheckIn(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.submitCheckIn, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
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
      await fetch(baseUrl + apiEndPoints.submitCheckOut, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function submitLeaveApplication(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.submitLeaveApplication, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function submitRoomIssue(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.submitRoomIssue, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function updateStudentDetails(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.updateStudentProfile, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function updateWardenProfile(data) {
  console.log(data);
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.updateWardenProfile + `?wardenid=${localStorage.getItem(localStorageKey.id)}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function createAnnouncement(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.createAnnouncement, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function updateLeaveApplication(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.updateLeaveApplication, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function resolveRoomIssue(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.resolveRoomIssue, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            localStorageKey.jwtToken
          )}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}