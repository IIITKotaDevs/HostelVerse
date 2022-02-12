import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import axios from "axios"
import baseurl from "../config"

function RoomIssue() {
    const [reason, setReason] = useState("")
    const handleReasonChange = (e) => {
        setReason(e.target.value)
        console.log(reason)
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const res = await axios.post(
            `${baseurl}/student/createRoomIssue`,
            {
                hostelid: localStorage.getItem('hostelid'),
                roomno: localStorage.getItem('roomno'),
                remarks: reason,
            },
            {
                headers: {
                    Authorization: localStorage.getItem('jwtToken') ? `Bearer ${localStorage.getItem('jwtToken')}` : "",
                    "Content-type": "application/json",
                }
            }
        )
        if(res.status === 200) {
            console.log("Room issue submitted successfully")
        } else {
            console.error("Something went wrong!")
        }
    }
  return (
    <div className="bg-room-issue h-screen bg-cover">
        <h1 className="text-4xl mt-2 text-center">Room Issue</h1>
        
        <div className="">
            <h1 className="text-center text-2xl mt-20">Reason</h1>
            <div className="mx-auto text-center mt-12 w-80">
            <TextField
                id="date"
                label="Enter your reason..."
                type="text"
                multiline
                rows={4}
                onChange={handleReasonChange}
                defaultValue=""
                InputLabelProps={{
                shrink: true,
                }}
            />
            </div>
        </div>

        <div className="mx-auto text-center mt-20">
            <button className="text-white bg-black px-4 py-2 rounded-3xl" onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default RoomIssue