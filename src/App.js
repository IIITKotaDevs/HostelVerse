import { Routes, Route } from "react-router-dom";
import { HostelList, HostelDetail } from "./student";
import Landing from "./registration/landing";
import SignUp from "./registration/signUp";
import SignIn from "./registration/signIn";
import Dashboard from "./student/dashboard";
import LeaveApplication from "./student/leaveapplication";
import RoomIssue from "./student/roomissue";
import FeedbackForm from "./student/feedbackform";
import UpdateProfile from "./student/updateprofile";
import Otp from "./registration/otp";
import { geolocated } from "react-geolocated";

function App(props) {
  console.log(props?.coords?.latitude);

  return (
    <>
      {/* <Navbar /> */}
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
        <Route path="/:user/update-profile" element={<UpdateProfile />} />
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
