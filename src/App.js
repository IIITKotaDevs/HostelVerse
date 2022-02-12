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

function App(props) {
  if (!props.coords)
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
          <Route path="/hostels" element={<HostelList />} />
          <Route path="/hostels/:id" element={<HostelDetail />} />
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
          <Route path="/:user/leave-applications" element={<LeaveApplications />} />
          <Route path="/:user/room-issues" element={<RoomIssuesList />} />
          {/* <Route path="/:user/pay-fee" element={<PayFee />} /> */}
        </Routes>
        {/* <Footer /> */}
      </>
    );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
