import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useMutateLeaveApplication } from "../queries/mutations";
import Leave from "../assets/img/leave.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Leave1 from "../assets/img/Leave1.png";
import Leave2 from "../assets/img/Leave2.png";
import Leave3 from "../assets/img/Leave3.png";

function LeaveApplication() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const images = [Leave1, Leave2, Leave3];

  var errorLength = 0;

  const validate = () => {
    errorLength = 0;
    setError([]);
    if (!startDate) {
      setError(error => [...error, { type: "StartDate", message: "Start Date is required" }]);
      errorLength++;
    }
    // Check if start date is less than current date
    if (startDate.length === 10 && new Date(startDate) <= new Date()) {
      setError(error => [...error, { type: "StartDate", message: "Start Date must not be less than current date" }]);
      errorLength++;
    }
    if (!endDate) {
      setError(error => [...error, { type: "EndDate", message: "End Date is required" }]);
      errorLength++;
    }
    // Check if end date is less than current date
    if (endDate.length === 10 && new Date(endDate) <= new Date()) {
      setError(error => [...error, { type: "EndDate", message: "End Date must not be less than current date" }]);
      errorLength++;
    }
    // Check if start date is greater than end date
    if (startDate.length === 10 && endDate.length === 10 && new Date(startDate) >= new Date(endDate)) {
      setError(error => [...error, { type: "EndDate", message: "End Date must be greater or equal to Start Date" }]);
      errorLength++;
    }
    if (!reason) {
      setError(error => [...error, { type: "Reason", message: "Reason is required" }]);
      errorLength++;
    }
    if (errorLength === 0) {
      return true;
    }
    return false;
  };

  const { mutateAsync: LeaveApplicationData } = useMutateLeaveApplication({
    onSuccess: () => {
      setSuccessMessage("Leave Application Submitted Successfully");
      setLoading(false);
      setStartDate("");
      setEndDate("");
      setReason("");
    },
    onError: () => { },
    onMutate: () => {
      setLoading(true);
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  }, [successMessage.length > 0]);

  return (
    <div className="flex">
      <div className="w-1/2 my-auto">
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-3 rounded-full border-4 border-gray-300 shadow-lg">
            <FontAwesomeIcon icon={solid("pen")} size="2x" className="text-blue-500 rounded-full" />
          </div>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">Leave Application</h1>
        </div>
        <div className="mt-12 flex justify-around">
          <div>
            <TextField
              id="startdate"
              label="Choose Starting Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              className="w-64"
            />
            {error.length > 0
              ? error.map((item, index) => {
                if (item.type === "StartDate") {
                  return (
                    <p className="text-red-500 text-xs" key={index}>
                      {item.message}
                    </p>
                  );
                }
              })
              : null}
          </div>
          <div>
            <TextField
              id="enddate"
              label="Choose Ending Date"
              value={endDate}
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              className="w-64"
            />
            {error.length > 0
              ? error.map((item, index) => {
                if (item.type === "EndDate") {
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
        <div className="mx-auto text-center mt-8 w-2/3 mb-8">
          <TextField
            id="reason"
            type="text"
            value={reason}
            multiline
            rows={6}
            onChange={(e) => setReason(e.target.value)}
            label="Reason"
            variant="outlined"
            className="w-full shadow-md"
          />
          {
            error.length > 0
              ? error.map((item, index) => {
                if (item.type === "Reason") {
                  return (
                    <p className="text-red-500 text-xs" key={index}>
                      {item.message}
                    </p>
                  );
                }
              })
              : null
          }
        </div>

        <h1 className="text-center font-semibold mb-2 text-sm text-green-500">{successMessage}</h1>
        <div className="text-center">
          <button
            className="text-white bg-gray-700 transition-all hover:bg-gray-900 font-medium shadow-lg hover:shadow-none px-4 py-2 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              validate() && LeaveApplicationData({ studentid: localStorage.getItem("id"), message: reason, date_to: endDate, date_from: startDate });
            }}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
      <div className="w-1/2 bg-no-repeat bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: `url(${Leave})` }} >
        <div className="w-3/4 z-0">
          <Carousel autoPlay={true} infiniteLoop={true} interval={3000} showThumbs={false} showStatus={false} showArrows={false} className="z-0">
            {images.map((item, index) => {
              return (
                <div key={index}>
                  <img src={item} alt="Leave" className="" />
                </div>
              );
            }
            )}
          </Carousel>
        </div>
      </div>
    </div >
  );
}

export default LeaveApplication;
