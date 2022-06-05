import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Rating from "@mui/material/Rating";
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import baseurl from "../config";
import axios from "axios";
import { localStorageKey } from "../utils/localStorageKey";
import feedback from '../assets/img/feedback.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro";

function FeedbackForm() {
  const [value, setValue] = useState(0);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hover, setHover] = useState(0);

  const labels = {
    0: "Unrated",
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

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

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  return (
    <div className="flex">
      <div className="my-auto w-1/2">
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 px-3 py-2.5 rounded-full border-4 border-gray-300 shadow-lg">
            <FontAwesomeIcon icon={solid("comment")} size="2x" className="text-red-400 rounded-full" />
          </div>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">Feedback Form</h1>
        </div>
        <div className="flex flex-col items-center mt-8">
          <h1 className="text-center text-lg mb-1">Rating</h1>
          <Box
            sx={{
              width: 200,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(e) => setValue(e.target.value)}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
              <Box sx={{ ml: 2, fontSize: "16px" }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
        </div>
        <div className="mx-auto text-center mt-8 w-2/3 rounded-lg shadow-lg">
          <TextField
            id="reason"
            type="text"
            value={review}
            multiline
            rows={6}
            onChange={(e) => setReview(e.target.value)}
            label="Reason"
            variant="outlined"
            className="w-full"
          />
        </div>

        <div className="mx-auto text-center mt-8">
          <button
            className="text-white bg-gray-700 hover:bg-gray-900 font-medium shadow-lg hover:shadow-none px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="w-1/2 bg-no-repeat bg-cover bg-center h-screen" style={{ backgroundImage: `url(${feedback})` }} />
    </div>
  );
}

export default FeedbackForm;
