import { Routes, Route, Navigate } from "react-router-dom";
import { HostelList, HostelDetail } from "./student";
import Landing from "./registration/landing";
import SignUp from "./registration/signUp";
import SignIn from "./registration/signIn";
import RequestResetPassword from "./registration/requestResetPassword";
import ResetPassword from "./registration/resetPassword";
import Dashboard from "./student/dashboard";
import LeaveApplication from "./student/leaveapplication";
import RoomIssue from "./student/roomissue";
import FeedbackForm from "./student/feedbackform";
import UpdateProfile from "./student/updateprofile";
import { geolocated } from "react-geolocated";
import Profile from "./student/profile";
import Payment from "./student/makepayment.js";
import Otp from "./registration/otp";
import StudentDetail from "./warden/studentDetail";
import Navbar from "./components/Navbar";
import StudentList from "./warden/studentList";
import LeaveApplications from "./warden/leaveApplications";
import RoomIssuesList from "./warden/roomIssuesList";
import WardenList from "./admin/WardenList";
import { localStorageKey } from "./utils/localStorageKey";
import { useEffect, useState } from "react";
import CreateWarden from "./admin/createWarden";
import { Announcement } from "./student/components/Announcement";
import PutAnnouncement from "./warden/putAnnouncement";
import { Attendes } from "./warden/Attendes";
import CreateHostel from "./admin/createHostel";
import StudentListAdmin from "./admin/studentList";
import ViewFeedback from "./admin/viewfeedback";
import AllotHostel from "./admin/allotHostel";
import Error404 from "./components/Error404";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from 'react-redux';
import Store from './store';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App(props) {
  useEffect(() => {
    if (props.coords !== null) {
      localStorage.setItem(localStorageKey.location, props.coords.latitude.toString() + "," + props.coords.longitude.toString());
    }
  }, [props.coords]);

  return (
    <div className="font-nunito">
      <Provider store={Store}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Routes>
            <Route path="/:user/hostels" element={<HostelList />} />
            <Route path="/:user/hostels/:id" element={<HostelDetail />} />
            <Route path="/" element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/request-reset-password" element={<RequestResetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/:user/dashboard" element={<Dashboard />} />
            <Route path="/:user/leave" element={<LeaveApplication />} />
            <Route path="/:user/issue" element={<RoomIssue />} />
            <Route path="/student/feedback" element={<FeedbackForm />} />
            <Route path="/:user/profile" element={<Profile />} />
            <Route path="/:user/update-profile" element={<UpdateProfile />} />
            <Route path="/:user/student-list" element={<StudentList />} />
            <Route path="/student-detail/:id" element={<StudentDetail />} />
            <Route path="/student/make-payment" element={<Payment />} />
            <Route path="/:user/leave-applications" element={<LeaveApplications />} />
            <Route path="/:user/room-issues" element={<RoomIssuesList />} />
            <Route path="/admin/warden-list" element={<WardenList />} />
            <Route path="/admin/create-hostel" element={<CreateHostel />} />
            <Route path="/admin/create-warden" element={<CreateWarden />} />
            <Route path="/admin/student-list" element={<StudentListAdmin />} />
            <Route path="/admin/view-feedback" element={<ViewFeedback />} />
            <Route path="/admin/allot-hostel" element={<AllotHostel />} />
            <Route path="/student/announcement" element={<Announcement />} />
            <Route path="/warden/announcement" element={<PutAnnouncement />} />
            <Route path="/:user/hostels/:id" element={<HostelDetail />} />
            <Route path="/warden/attendees" element={<Attendes />} />
            <Route path="/404" element={<Error404 />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
