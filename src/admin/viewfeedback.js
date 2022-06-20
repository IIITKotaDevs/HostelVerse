import axios from "axios";
import React, { useState, useEffect } from "react";
import baseurl from "../config";
import { localStorageKey } from "../utils/localStorageKey";
import Loader from '../components/Loader';
import {useFeedbackList} from '../queries/hooks';

export default function ViewFeedback() {
  const [feedbackData, setFeedbackData] = useState([]);

  const feedbacks = useFeedbackList({});

  useEffect(() => {
    setFeedbackData(feedbacks.data?.data);
  }, [feedbacks.isSuccess]);

  return (
    <>
      <p className="font-bold text-3xl text-center mt-12 mb-8">Feedback List</p>

      {feedbackData ? (
      	<div className="flex flex-col gap-4">
        {feedbackData.map((feedback, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center mx-32 px-10 py-4 border border-gray-200 rounded-lg shadow-md"
            >
              <div>
                {feedback.rating < 2 && (
                  <div>
                    <span className="text-3xl font-semibold mb-2 mr-4">
                      {feedback.hostelid}
                    </span>
                    <span className="bg-red-500 p-2 text-lg mt-2 text-white rounded-md">
                      {feedback.rating} / 5
                    </span>
                  </div>
                )}
                {feedback.rating >= 2 && feedback.rating < 3 && (
                  <p>
                    <span className="bg-yellow-400 p-2 text-lg mt-2 text-white rounded-md">
                      {feedback.rating} / 5
                    </span>
                  </p>
                )}
                {feedback.rating >= 3 && (
                  <div>
                    <span className="text-3xl font-semibold mr-4">
                      {feedback.hostelid}
                    </span>
                    <span className="bg-green-500 px-2 py-1 text-lg text-white font-bold rounded-md">
                      {feedback.rating} / 5
                    </span>
                  </div>
                )}
                <p className="text-gray-500 text-lg cursor-pointer font-medium mt-2">
                  Feedback by: {feedback.name} | {feedback.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>) : (<Loader />)}
      
    </>
  );
}
