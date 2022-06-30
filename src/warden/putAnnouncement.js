import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import baseurl from "../config";
import axios from "axios";
import { localStorageKey } from "../utils/localStorageKey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import PostAnnouncement from "../assets/img/postAnnouncement.jpg";
import { useMutateCreateAnnouncement } from "../queries/mutations";

function PutAnnouncement() {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { mutateAsync: CreateAnnouncementData } = useMutateCreateAnnouncement({
    onSuccess: () => {
      setLoading(false);
      setSuccessMessage("Announcement Posted Successfully");
      setHeading("");
      setContent("");
    },
    onError: () => { },
    onMutate: () => {
      setLoading(true);
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }, [successMessage]);

  return (
    <div className="flex">
      <div className="w-1/2 my-auto">
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 py-2 px-3.5 rounded-full border-4 border-gray-300 shadow-lg">
            <FontAwesomeIcon icon={solid("clipboard")} size="2x" className="text-amber-600 rounded-full" />
          </div>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">Post Announcement</h1>
        </div>
        <div className="mx-auto text-center mt-8 w-2/3 mb-4">
          <TextField
            id="heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            label="Heading"
            variant="standard"
            className="w-full"
          />
        </div>

        <div className="mx-auto text-center mt-4 w-2/3 rounded-lg shadow-lg mb-6">
          <TextField
            id="content"
            type="text"
            value={content}
            multiline
            rows={10}
            onChange={(e) => setContent(e.target.value)}
            label="Content"
            variant="outlined"
            className="w-full"
          />
        </div>

        <h1 className="text-center font-medium mb-2 text-sm text-green-500 italic">{successMessage}</h1>
        <div className="text-center">
          <button
            className="text-white bg-gray-700 transition-all hover:bg-gray-900 font-medium shadow-lg hover:shadow-none px-4 py-2 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              CreateAnnouncementData({
                wardenid: localStorage.getItem(localStorageKey.id),
                heading: heading,
                message: content,
              });
            }}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
      <div className="w-1/2 bg-no-repeat bg-cover bg-center h-screen" style={{ backgroundImage: `url(${PostAnnouncement})` }} />
    </div >
  );
}

export default PutAnnouncement;
