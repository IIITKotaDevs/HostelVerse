import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from "axios"
// import FormData from "form-data";
import baseurl from "../config"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { localStorageKey } from '../utils/localStorageKey';
import Issue from "../assets/img/updateProfile.jpg";
// import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';
// import { localStorageKey } from '../utils/localStorageKey';

function UpdateProfile() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState(localStorage.getItem(localStorageKey.gender))
    const [location, setLocation] = useState(localStorage.getItem(localStorageKey.location))
    // const [percentage, setPercentage] = useState(0)
    const [contact, setContact] = useState(localStorage.getItem(localStorageKey.contactNo))
    const [email, setEmail] = useState(localStorage.getItem(localStorageKey.email))
    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
        <div className="flex">
            <div className="w-3/5 my-auto">
                <div className="">
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-200 p-3 rounded-full border-4 border-gray-300 shadow-lg">
                            <FontAwesomeIcon icon={solid("pen-nib")} size="2x" className="text-primary rounded-full" />
                        </div>
                        <h1 className="text-3xl font-bold mt-4 text-gray-800">Update Profile</h1>
                    </div>
                    <div className="flex gap-4 mx-auto text-center my-8 w-3/4">
                        <TextField
                            id="name"
                            label="Name"
                            type="text"
                            value={name}
                            variant="outlined"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full shadow-md"
                        />
                        <TextField
                            id="name"
                            label="Phone"
                            type="text"
                            value={name}
                            variant="outlined"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full shadow-md"
                        />
                    </div>
                    <div className="flex gap-4 mx-auto text-center my-8 w-3/4">
                        <FormControl className='w-full shadow-md text-left'>
                            <InputLabel id="gender">Gender</InputLabel>
                            <Select
                                labelId="gender"
                                id="gender"
                                value={gender}
                                label="gender"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className='w-full shadow-md'>
                            <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Old Password"
                            />
                        </FormControl>
                    </div>
                </div>

                <span>
                    {/* <p className="text-center mb-4 text-sm text-green-500">{successMessage}</p> */}
                </span>

                <div className="mx-auto text-center">
                    <button
                        className="text-white bg-gray-700 hover:bg-gray-900 font-medium shadow-lg hover:shadow-none px-4 py-2 rounded-lg"
                        onClick={(e) => {
                            e.preventDefault();
                            validate() && RoomIssueData({ studentid: localStorage.getItem("id"), message: reason });
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <img src={Issue} alt="" className="w-2/5 bg-no-repeat bg-cover bg-center h-screen" />
        </div >
    )
}

export default UpdateProfile