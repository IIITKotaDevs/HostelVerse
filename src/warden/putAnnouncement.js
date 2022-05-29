import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import baseurl from "../config";
import axios from "axios";
import { localStorageKey } from "../utils/localStorageKey";

function PutAnnouncement() {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${baseurl}/createAnnouncement`,
      {
        wardenid: localStorage.getItem(localStorageKey.id),
        heading: heading,
        message: content,
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

    setContent("");
    setHeading("");
    if (res.status === 200) {
      console.log("Submitted successfully");
    } else {
      console.error("Something went wrong!");
    }

    document.getElementById("heading").value = "";
    document.getElementById("content").value = "";
  };
  const handleContentChange = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };
  const handleHeadingChange = (e) => {
    e.preventDefault();
    setHeading(e.target.value);
  };

  return (
    <div className="">
      <h1 className="text-4xl mt-2 text-center">Make Announcement</h1>
      <div className="mx-auto text-center w-80 col-span-1">
        <h1 className="text-center text-2xl mt-20 mb-8">Heading</h1>
        <TextField
          id="heading"
          label="Enter heading..."
          type="text"
          multiline
          onChange={handleHeadingChange}
          defaultValue=""
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="mx-auto text-center w-80 col-span-1">
        <h1 className="text-center text-2xl mt-20 mb-8">Content</h1>
        <TextField
          id="content"
          label="Enter content..."
          type="text"
          multiline
          onChange={handleContentChange}
          defaultValue=""
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="mx-auto text-center mt-20">
        <button
          className="text-white bg-black px-4 py-2 rounded-3xl"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default PutAnnouncement;
