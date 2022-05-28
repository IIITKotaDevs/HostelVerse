import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import axios from "axios"
// import FormData from "form-data";
import baseurl from "../config"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { localStorageKey } from '../utils/localStorageKey';
// import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';
// import { localStorageKey } from '../utils/localStorageKey';

function UpdateProfile() {
    const [gender, setGender] = useState(localStorage.getItem(localStorageKey.gender))
    const [location, setLocation] = useState(localStorage.getItem(localStorageKey.location))
    // const [percentage, setPercentage] = useState(0)
    const [contact, setContact] = useState(localStorage.getItem(localStorageKey.contactNo))
    const [email, setEmail] = useState(localStorage.getItem(localStorageKey.email))

    // const selectFile = async (e) => {
    //     const files = Array.from(e.target.files)
    //     const file = files[0]

    //     var bodyFormData = new FormData()

    //     bodyFormData.append('photo', file)

    //     const options = {
    //       headers: {
    //         Authorization: localStorage.getItem(localStorageKey.jwtToken) ? `Bearer ${localStorage.getItem(localStorageKey.jwtToken)}` : "",
    //         "Content-type": "multipart/form-data",
    //       },
    //       onUploadProgress: (progressEvent) => {
    //         const { loaded, total } = progressEvent
    //         let percent = Math.floor(loaded * 100 / total)
    //         console.log(`${percent} %`)

    //         if(percent < 100) {
    //           setPercentage(percent)
    //         }
    //       }
    //     }

    //     const res = await axios.post(
    //       `${baseurl}/uploadImage`,
    //       bodyFormData,
    //       options
    //     );
    //     var content = res.data.url;
    //     const result = await axios.post(`${baseurl}/admin/createhostel`,
    //     {
    //     })
    //     setPercentage(0)
    //     document.getElementById("file-image").value = '';
    //     content=""
    // }

    const handleContactChange = (e) => {
        e.preventDefault()
        setContact(e.target.value)
    }
    const handleGenderChange = (e) => {
        e.preventDefault()
        setGender(e.target.value)
    }
    const handleAddressChange = (e) => {
        e.preventDefault()
        setLocation(e.target.value)
    }
    const handleEmailChange = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post(`${baseurl}/student/profile`, {
            email: email,
            contact: contact,
            location: location,
            gender: gender
        },
            {
                headers: {
                    Authorization: localStorage.getItem(localStorageKey.jwtToken) ? `Bearer ${localStorage.getItem(localStorageKey.jwtToken)}` : "",
                    "Content-type": "application/json",
                }
            })
        if (res.status === 200) {
            console.log("Updated successfully")
        } else {
            console.error("Something went wrong!")
        }
    }
    return (
        <div className="bg-room-issue h-screen bg-cover">
            <h1 className="text-4xl mt-2 text-center">Update Profile</h1>
            <div className="mx-auto text-center w-80 flex items-center gap-4 mt-20 mb-8">
                <h1 className="text-center text-2xl">Update Profile Photo</h1>
                {/* <input id="file-image" onChange={() => console.log('Changed')} type="file"> */}
                <FontAwesomeIcon icon={solid('upload')} />
                {/* </input> */}
            </div>

            {/* {percentage > 0 && <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={`width=${percentage}%`}> {percentage}%</div>} */}

            <div className="mx-auto text-center px-60 grid grid-cols-1 md:grid-cols-4">
                <div className="col-span-1">
                    <h1 className="text-center text-2xl mt-20 mb-8">Email</h1>
                    <TextField
                        id="date"
                        label="Your email..."
                        type="text"
                        multiline
                        onChange={handleEmailChange}
                        defaultValue={email}
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
                        defaultValue={gender}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <h1 className="text-center text-2xl mt-20 mb-8">Location</h1>
                    <TextField
                        id="date"
                        label="Your address..."
                        type="text"
                        multiline
                        onChange={handleAddressChange}
                        defaultValue={location}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <h1 className="text-center text-2xl mt-20 mb-8">Contact</h1>
                    <TextField
                        id="date"
                        label="Your contact..."
                        type="text"
                        multiline
                        onChange={handleContactChange}
                        defaultValue={contact}
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