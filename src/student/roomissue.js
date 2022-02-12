import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';

function RoomIssue() {
    const [reason, setReason] = useState("")
    const handleReasonChange = (e) => {
        setReason(e.target.value)
        console.log(reason)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('You submitted the input')
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