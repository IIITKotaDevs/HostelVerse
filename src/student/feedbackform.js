import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Rating from "@mui/material/Rating";
import baseurl from "../config";
import axios from "axios";
import { localStorageKey } from "../utils/localStorageKey";

function FeedbackForm() {
  const [value, setValue] = useState(0);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting your feeback...");
    if (localStorage.getItem("hostelid")) {
      const res = await axios.post(
        `${baseurl}/createFeedback`,
        {
          studentid: localStorage.getItem("id"),
          name: localStorage.getItem("name"),
          rating: value,
          message: review,
          hostelid: localStorage.getItem("hostelid"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              localStorageKey.jwtToken
            )}`,
            "Content-type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        console.log("Submitted successfully");
        setMessage("");
        setSuccessMessage("Feedback submitted successfully!");
      } else {
        console.error("Something went wrong!");
        setMessage("Something went wrong!");
      }

      document.getElementById("feedback").input = "";
    }
  };
  const handleReviewChange = (e) => {
    e.preventDefault();
    setReview(e.target.value);
  };

  return (
    <div className="bg-room-issue h-screen bg-cover">
      <h1 className="text-4xl mt-2 text-center">Feedback Form</h1>
      <div className="mx-auto text-center w-80">
        <h1 className="text-center mt-12 text-3xl text-red-500">{message}</h1>
        <h1 className="text-center mt-12 text-3xl text-green-500">
          {successMessage}
        </h1>
        <h1 className="text-center text-2xl mt-20 mb-8">Rating</h1>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(value);
          }}
        />
      </div>

      <div className="mx-auto text-center w-80">
        <h1 className="text-center text-2xl mt-20 mb-8">Review</h1>
        <div className="border-2 border-gray-500 py-6 rounded-lg shadow-lg bg-white">
          <TextField
            id="feedback"
            label="Enter your reason..."
            type="text"
            multiline
            rows={4}
            onChange={handleReviewChange}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>

      <div className="mx-auto text-center mt-20">
        <button
          className="text-white bg-black px-4 py-2 rounded-xl"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default FeedbackForm;
