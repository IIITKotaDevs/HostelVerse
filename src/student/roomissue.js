import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useMutateRoomIssue } from "../queries/mutations";
import Issue from "../assets/img/Issue.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro";

function RoomIssue() {
  const [reason, setReason] = useState("");
  const [error, setError] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  var errorLength = 0;

  const validate = () => {
    errorLength = 0;
    if (!reason) {
      setError(error => [...error, { type: "Reason", message: "Reason is required" }]);
      errorLength++;
    }
    if (errorLength === 0) {
      return true;
    }
    return false;
  };

  const { mutateAsync: RoomIssueData } = useMutateRoomIssue({
    onSuccess: () => {
      setSuccessMessage("Room Issues submitted successfully");
      setReason("");
    },
    onError: () => { }
  });

  return (
    <div className="flex">
      <div className="w-1/2 my-auto">
        <div className="">
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 p-3 rounded-full border-4 border-gray-300 shadow-lg">
              <FontAwesomeIcon icon={solid("triangle-exclamation")} size="2x" className="text-red-500 rounded-full" />
            </div>
            <h1 className="text-3xl font-bold mt-4 text-gray-800">Room Issue</h1>
          </div>
          <div className="mx-auto text-center mt-8 w-2/3 rounded-lg shadow-lg mb-8">
            <TextField
              id="reason"
              label="Issue"
              type="text"
              multiline
              value={reason}
              rows={6}
              variant="outlined"
              onChange={(e) => setReason(e.target.value)}
              className="w-full"
            />
            {error.length > 0
              ? error.map((item, index) => {
                if (item.type === "Reason") {
                  return (
                    <p className="text-red-500 text-xs" key={index}>
                      {item.message}
                    </p>
                  );
                }
              })
              : null}
          </div>
        </div>

        <span>
          <p className="text-center mb-4 text-sm text-green-500">{successMessage}</p>
        </span>

        <div className="mx-auto text-center">
          <button
            className="text-white bg-gray-700 hover:bg-gray-900 font-medium shadow-lg hover:shadow-none px-4 py-2 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              validate() && RoomIssueData({ studentid: localStorage.getItem("id"), message: reason });
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <img src={Issue} alt="" className="w-1/2 bg-no-repeat bg-cover bg-center h-screen" />
    </div >
  );
}

export default RoomIssue;
