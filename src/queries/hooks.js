import QUERY_KEYS from "./queryKeys";
import { useQuery } from "react-query";
import {
  getStudentDetails,
  getHostelList,
  getHostelDetail,
  getRoomIssueList,
  getLeaveApplicationList,
  getStudentList,
  getStudentDetailsWarden,
  getStudentDetailsAdmin,
  getStudentAttendanceList,
  getAnnouncementList,
  getWardenProfile,
  getWardenList,
  getAdminProfile,
  getAdminDashboard,
  getFeedbackList,
  getStudentListAdmin,
} from "../services";

export const useStudentDetails = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_STUDENT_DETAILS, params.studentid],
    () => getStudentDetails(params),
    {
      retry: false,
    }
  );
};

export const useHostelList = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_HOSTEL_LIST, params.low, params.high, params?.hostelid],
    () => getHostelList(params),
    {
      retry: false,
    }
  );
};

export const useHostelDetails = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_HOSTEL_DETAILS, params.hostelid],
    () => getHostelDetail(params),
    {
      retry: false,
    }
  );
};

export const useRoomIssueList = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_ROOM_ISSUE_LIST, params.wardenid],
    () => getRoomIssueList(params),
    {
      retry: false,
    }
  );
};

export const useLeaveApplicationList = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_LEAVE_APPLICATIONS_LIST, params.wardenid],
    () => getLeaveApplicationList(params),
    {
      retry: false,
    }
  );
};

export const useStudentList = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_STUDENT_LIST, params.wardenid],
    () => getStudentList(params),
    {
      retry: false,
    }
  );
};

export const useStudentListAdmin = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_STUDENT_LIST, params.adminid, params.wardenid],
    () => getStudentListAdmin(params),
    {
      retry: false,
    }
  );
};

export const useWardenList = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_WARDEN_LIST, params.wardenid],
    () => getWardenList(params),
    {
      retry: false,
    }
  );
};

export const useFeedbackList = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_FEEDBACK_LIST, params.feedbackid],
    () => getFeedbackList(params),
    {
      retry: false,
    }
  );
};

export const useStudentDetailsWarden = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_STUDENT_DETAILS_WARDEN, params.studentid, params.wardenid],
    () => getStudentDetailsWarden(params),
    {
      retry: false,
    }
  );
};

export const useStudentDetailsAdmin = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_STUDENT_DETAILS_ADMIN, params.studentid, params.adminid],
    () => getStudentDetailsAdmin(params),
    {
      retry: false,
    }
  );
};

export const useStudentAttendanceList = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_STUDENT_ATTENDANCE_LIST, params.wardenid],
    () => getStudentAttendanceList(params),
    {
      retry: false,
    }
  );
};

export const useAnnouncementList = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_ANNOUNCEMENT_LIST, params.studentid],
    () => getAnnouncementList(params),
    {
      retry: false,
    }
  );
};

export const useWardenProfile = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_WARDEN_PROFILE, params.wardenid],
    () => getWardenProfile(params),
    {
      retry: false,
    }
  );
};

export const useAdminProfile = (params) => {
  return useQuery(
    [QUERY_KEYS.GET_ADMIN_PROFILE, params.adminid],
    () => getAdminProfile(params),
    {
      retry: false,
    }
  );
};

export const useAdminDashboard = () => {
  return useQuery(
    [QUERY_KEYS.GET_ADMIN_DASHBOARD],
    () => getAdminDashboard(),
    {
      retry: false,
    }
  );
};
