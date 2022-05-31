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
  GET_STUDENT_ATTENDANCE_LIST: generateKeyName("get-student-attendance-list"),
};

export default QUERY_KEYS;
