import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function FeedbackForm() {
    const [value, setValue] = useState(0)
    const [review, setReview] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('You submitted the input')
    }
    const handleReviewChange = (e) => {
        e.preventDefault()
        setReview(e.target.value)
        console.log(review)
    }
  return (
    <div className="bg-room-issue h-screen bg-cover">
        <h1 className="text-4xl mt-2 text-center">Feedback Form</h1>
        <div className="mx-auto text-center w-80">
            <h1 className="text-center text-2xl mt-20 mb-8">Rating</h1>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                console.log(value)
                }}
            />
        </div>

        <div className="mx-auto text-center w-80">
            <h1 className="text-center text-2xl mt-20 mb-8">Review</h1>
            <TextField
                id="date"
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

        <div className="mx-auto text-center mt-20">
            <button className="text-white bg-black px-4 py-2 rounded-3xl" onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default FeedbackForm