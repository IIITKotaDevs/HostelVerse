import { TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import baseurl from "../config";

const CreateHostel = () => {
  const [success, setSuccess] = useState("");
  const [hostelId, setHostelId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [wardenid, setWardenId] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [singlerooms, setSingleRooms] = useState("");
  const [doublerooms, setDoubleRooms] = useState("");
  const [triplerooms, setTripleRooms] = useState("");
  const [fees, setFees] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${baseurl}/createHostel`,
      {
        hostelid: hostelId,
        name: name,
        location: location,
        wardenid: wardenid,
        description: description,
        totalCapacity: +capacity,
        singleRooms: +singlerooms,
        doubleRooms: +doublerooms,
        tripleRooms: +triplerooms,
        fees: fees,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken")
            ? `Bearer ${localStorage.getItem("jwtToken")}`
            : "",
          "Content-type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      console.log("Submitted successfully");
      setHostelId("");
      setName("");
      setLocation("");
      setWardenId("");
      setDescription("");
      setCapacity("");
      setSingleRooms("");
      setDoubleRooms("");
      setTripleRooms("");
      setFees("");
      setSuccess("Hostel created successfully!");
    } else {
      console.error("Something went wrong!");
    }

    document.getElementById("hostelid").value = "";
    document.getElementById("name").value = "";
    document.getElementById("location").value = "";
    document.getElementById("wardenid").value = "";
    document.getElementById("description").value = "";
    document.getElementById("capacity").value = "";
    document.getElementById("singlerooms").value = "";
    document.getElementById("doublerooms").value = "";
    document.getElementById("triplerooms").value = "";
    document.getElementById("fees").value = "";
  };

  return (
    <div className="">
      <h1 className="text-4xl mt-2 text-center">Create Hostel</h1>
      {success && (
        <h1 className="text-center mt-12 text-3xl text-green-500">{success}</h1>
      )}
      <div className="grid grid-cols-3">
        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">Hostel ID</h1>
          <TextField
            id="hostelid"
            label="Enter hostel id..."
            type="text"
            multiline
            onChange={(e) => setHostelId(e.target.value)}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">Name</h1>
          <TextField
            id="name"
            label="Enter hostel name..."
            type="text"
            multiline
            onChange={(e) => setName(e.target.value)}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">Location</h1>
          <TextField
            id="location"
            label="Enter hostel location..."
            type="text"
            multiline
            onChange={(e) => setLocation(e.target.value)}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">Warden ID</h1>
          <TextField
            id="wardenid"
            label="Enter warden id..."
            type="text"
            multiline
            onChange={(e) => setWardenId(e.target.value)}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">Description</h1>
          <TextField
            id="description"
            label="Enter description..."
            type="text"
            multiline
            onChange={(e) => setDescription(e.target.value)}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">Capacity</h1>
          <TextField
            id="capacity"
            label="Enter capacity..."
            type="text"
            multiline
            onChange={(e) => setCapacity(e.target.value)}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">
            No. of single rooms
          </h1>
          <TextField
            id="singlerooms"
            label="No. of single rooms..."
            type="text"
            multiline
            onChange={(e) => setSingleRooms(e.target.value)}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">
            No. of double rooms
          </h1>
          <TextField
            id="doublerooms"
            label="No. of double rooms..."
            type="text"
            multiline
            onChange={(e) => setDoubleRooms(e.target.value)}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">
            No. of triple rooms
          </h1>
          <TextField
            id="triplerooms"
            label="No. of triple rooms..."
            type="text"
            multiline
            onChange={(e) => setTripleRooms(e.target.value)}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="mx-auto text-center w-80 col-span-1">
          <h1 className="text-center text-2xl mt-20 mb-8">Fees</h1>
          <TextField
            id="fees"
            label="Enter fees..."
            type="text"
            multiline
            onChange={(e) => setFees(e.target.value)}
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
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
};

export default CreateHostel;
