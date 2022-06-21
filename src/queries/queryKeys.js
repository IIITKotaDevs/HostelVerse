const MODULE_NAME = "hostel-verse";

function generateKeyName(value) {
  return [MODULE_NAME, value];
}

const QUERY_KEYS = {
  GET_STUDENT_DETAILS: generateKeyName("get-student-details"),
  GET_HOSTEL_LIST: generateKeyName("get-hostel-list"),
  GET_HOSTEL_DETAILS: generateKeyName("get-hostel-details"),
  GET_ROOM_ISSUE_LIST: generateKeyName("get-room-issue-list"),
  GET_LEAVE_APPLICATIONS_LIST: generateKeyName("get-leave-applications-list"),
  GET_STUDENT_LIST: generateKeyName("get-student-list"),
  GET_STUDENT_DETAILS_WARDEN: generateKeyName("get-student-details-warden"),
  GET_STUDENT_ATTENDANCE_LIST: generateKeyName("get-student-attendance-list"),
  GET_ANNOUNCEMENT_LIST: generateKeyName("get-announcement-list"),
  GET_WARDEN_PROFILE: generateKeyName("get-warden-profile"),
  GET_WARDEN_LIST: generateKeyName("get-warden-list"),
  GET_ADMIN_PROFILE: generateKeyName("get-admin-profile"),
  GET_ADMIN_DASHBOARD: generateKeyName("get-admin-dashboard"),
  GET_FEEDBACK_LIST: generateKeyName("get-feedback-list"),
  GET_STUDENT_LIST_ADMIN: generateKeyName("get-student-list-admin"),
};

export default QUERY_KEYS;
