import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function UpdateProfile() {
    const student = { name: "Vinamra", gender: "Male", location: "Ghaziabad, India"}
    const [name, setName] = useState(student.name)
    const [gender, setGender] = useState(student.gender)
    const [location, setLocation] = useState(student.location)

    const handleNameChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }
    const handleGenderChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }
    const handleAddressChange = (e) => {
        e.preventDefault()
        setLocation(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('You submitted the input')
    }
  return (
    <div className="bg-room-issue h-screen bg-cover">
        <h1 className="text-4xl mt-2 text-center">Update Profile</h1>
        <div className="mx-auto text-center w-80">
            <h1 className="text-center text-2xl mt-20 mb-8">Update Profile Photo</h1>
            
        </div>

        <div className="mx-auto text-center px-60 grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1">
                <h1 className="text-center text-2xl mt-20 mb-8">Name</h1>
                <TextField
                    id="date"
                    label="Your name..."
                    type="text"
                    multiline
                    onChange={handleNameChange}
                    defaultValue={student.name}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </div>
            <div className="col-span-1">
                <h1 className="text-center text-2xl mt-20 mb-8">Gender</h1>
                <TextField
                    id="date"
                    label="Your gender..."
                    type="text"
                    multiline
                    onChange={handleGenderChange}
                    defaultValue={student.gender}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </div>
            <div className="col-span-1">
                <h1 className="text-center text-2xl mt-20 mb-8">Name</h1>
                <TextField
                    id="date"
                    label="Your address..."
                    type="text"
                    multiline
                    onChange={handleAddressChange}
                    defaultValue={student.location}
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

export default UpdateProfile