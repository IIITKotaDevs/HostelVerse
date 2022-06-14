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
    const [github, setGithub] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [instagram, setInstagram] = useState("")
    const [twitter, setTwitter] = useState("")
    const [bio, setBio] = useState("")
    const [values, setValues] = useState({
        showPasswordOld: false,
        showPasswordNew: false,
        showPasswordConfirm: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPasswordOld = () => {
        setValues({
            ...values,
            showPasswordOld: !values.showPasswordOld,
        });
    };

    const handleClickShowPasswordNew = () => {
        setValues({
            ...values,
            showPasswordNew: !values.showPasswordNew,
        });
    };

    const handleClickShowPasswordConfirm = () => {
        setValues({
            ...values,
            showPasswordConfirm: !values.showPasswordConfirm,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                <div className="flex flex-col items-center">
                    <div className="bg-gray-200 p-3 rounded-full border-4 border-gray-300 shadow-lg">
                        <FontAwesomeIcon icon={solid("pen-nib")} size="2x" className="text-primary rounded-full" />
                    </div>
                    <h1 className="text-3xl font-bold mt-3 text-gray-800">Update Profile</h1>
                </div>
                <p className='text-sm font-bold text-gray-400 text-center mt-3 mb-2'>PROFILE</p>
                <div className="flex gap-4 mx-auto w-3/4">
                    <TextField
                        id="name"
                        label="Name"
                        type="text"
                        value={name}
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full shadow"
                        size='small'
                    />
                    <TextField
                        id="phone"
                        label="Phone"
                        type="text"
                        value={phone}
                        variant="outlined"
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full shadow"
                        size='small'
                    />
                </div>
                <div className="flex items-center gap-4 mx-auto mt-3 w-3/4">
                    <div className='w-full'>
                        <FormControl className='w-full shadow' size='small'>
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
                    </div>
                    <TextField
                        id="github"
                        label="Github Url"
                        type="text"
                        value={github}
                        variant="outlined"
                        onChange={(e) => setGithub(e.target.value)}
                        className="w-full shadow"
                        size='small'
                    />
                </div>
                <div className="flex items-center gap-4 mx-auto mt-3 w-3/4">
                    <TextField
                        id="linkedin"
                        label="Linkedin Url"
                        type="text"
                        value={linkedin}
                        variant="outlined"
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="w-full shadow"
                        size='small'
                    />
                    <TextField
                        id="instagram"
                        label="Instagram Url"
                        type="text"
                        value={instagram}
                        variant="outlined"
                        onChange={(e) => setInstagram(e.target.value)}
                        className="w-full shadow"
                        size='small'
                    />
                </div>
                <div className="flex items-center gap-4 mx-auto mt-3 w-3/4">
                    <TextField
                        id="twitter"
                        label="Twitter Url"
                        type="text"
                        value={twitter}
                        variant="outlined"
                        onChange={(e) => setTwitter(e.target.value)}
                        className="w-full shadow"
                        size='small'
                    />
                    <div className='w-full'></div>
                </div>
                <div className="flex items-center gap-4 mx-auto mt-3 w-3/4">
                    <TextField
                        id="bio"
                        label="Bio"
                        type="text"
                        value={bio}
                        variant="outlined"
                        multiline
                        rows={4}
                        inputProps={{ maxLength: 200 }}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full shadow"
                        size='small'
                    />
                </div>
                {/* <p className='text-sm font-bold text-gray-400 text-center mt-4 mb-2'>CHANGE PASSWORD</p>
                <div className='flex items-center gap-4 mx-auto w-3/4'>
                    <div className='w-full'>
                        <FormControl variant="outlined" className='w-full shadow' size='small'>
                            <InputLabel htmlFor="password-old">Old Password</InputLabel>
                            <OutlinedInput
                                id="password-old"
                                type={values.showPasswordOld ? 'text' : 'password'}
                                value={values.passwordOld}
                                onChange={handleChange('passwordOld')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordOld}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPasswordOld ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Old Password"
                            />
                        </FormControl>
                    </div>
                    <div className='w-full'>
                        <FormControl variant="outlined" className='w-full shadow' size='small'>
                            <InputLabel htmlFor="password-new">New Password</InputLabel>
                            <OutlinedInput
                                id="password-new"
                                type={values.showPasswordNew ? 'text' : 'password'}
                                value={values.passwordNew}
                                onChange={handleChange('passwordNew')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordNew}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPasswordNew ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="New Password"
                            />
                        </FormControl>
                    </div>
                </div>
                <div className='flex items-center gap-4 mx-auto w-3/4 mt-3'>
                    <div className='w-full'>
                        <FormControl variant="outlined" className='w-full shadow' size='small'>
                            <InputLabel htmlFor="password-confirm">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="password-confirm"
                                type={values.showPasswordConfirm ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('passwordConfirm')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordConfirm}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Old Password"
                            />
                        </FormControl>
                    </div>
                    <div className='w-full'></div>
                </div> */}

                <span>
                    {/* <p className="text-center mb-4 text-sm text-green-500">{successMessage}</p> */}
                </span>

                <div className="mx-auto text-center mt-4">
                    <button
                        className="text-white bg-gray-700 hover:bg-gray-900 font-medium shadow-lg hover:shadow-none px-4 py-2 rounded-lg"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        Update
                    </button>
                </div>
            </div>
            <img src={Issue} alt="" className="w-2/5 bg-no-repeat bg-cover bg-center h-screen" />
        </div >
    )
}

export default UpdateProfile