import { Routes, Route, useParams } from "react-router-dom";
import { HostelList, HostelDetail } from "./student";
import Landing from "./registration/landing";
import SignUp from "./registration/signUp";
import SignIn from "./registration/signIn";
import Dashboard from "./student/dashboard";
import LeaveApplication from "./student/leaveapplication";
import RoomIssue from "./student/roomissue";
import FeedbackForm from "./student/feedbackform";
import UpdateProfile from "./student/updateprofile";
import { geolocated } from "react-geolocated";
import Profile from "./student/profile";
import Otp from "./registration/otp";
import Navbar from "./components/Navbar";
import StudentList from "./student/studentList";
import LeaveApplications from "./warden/leaveApplications";
import RoomIssuesList from "./warden/roomIssuesList";
import WardenList from "./admin/WardenList";
import { localStorageKey } from "./utils/localStorageKey";
import { useEffect } from "react";
import CreateWarden from "./admin/createWarden";
import { Announcement } from "./student/components/Announcement";
import PutAnnouncement from "./warden/putAnnouncement";
import { Attendes } from "./warden/Attendes";

function App(props) {
  useEffect(() => {
    if (
      (props.coords && !localStorage.getItem(localStorageKey.location)) ||
      localStorage.getItem(localStorageKey.location) === "null"
    ) {
      localStorage.setItem(
        localStorageKey.location,
        props.coords.latitude.toString() +
        "," +
        props.coords.longitude.toString()
      );
    }
  });

  if (
    !localStorage.getItem(localStorageKey.location) ||
    localStorage.getItem(localStorageKey.location) === "null"
  )
    return (
      <div className="w-full h-full flex justify-center align-middle">
        <img
          className=""
          alt="loader"
          src={require("./assets/img/loading.gif")}
        />
      </div>
    );
  else
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/:user/hostels" element={<HostelList />} />
          <Route path="/:user/hostels/:id" element={<HostelDetail />} />
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/:user/dashboard" element={<Dashboard />} />
          <Route path="/:user/leave" element={<LeaveApplication />} />
          <Route path="/:user/issue" element={<RoomIssue />} />
          <Route path="/:user/feedback" element={<FeedbackForm />} />
          <Route path="/:user/profile" element={<Profile />} />
          <Route path="/:user/update-profile" element={<UpdateProfile />} />
          <Route path="/:user/student-list" element={<StudentList />} />
          <Route
            path="/:user/leave-applications"
            element={<LeaveApplications />}
          />
          <Route path="/:user/room-issues" element={<RoomIssuesList />} />
          <Route path="/:user/warden-list" element={<WardenList />} />
          <Route path="/admin/create-warden" element={<CreateWarden />} />
          <Route path="/student/announcement" element={<Announcement />} />
          <Route path="/warden/announcement" element={<PutAnnouncement />} />
          <Route path="/:user/hostels/:id" element={<HostelDetail />} />
          <Route path="/warden/attendees" element={<Attendes />} />
        </Routes>
      </>
    );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
