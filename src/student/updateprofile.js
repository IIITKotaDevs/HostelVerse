import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import baseurl from "../config"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { localStorageKey } from '../utils/localStorageKey';
import Issue from "../assets/img/updateProfile.jpg";
import { useMutateUpdateStudentDetails, useMutateUpdateWardenProfile } from '../queries/mutations';
import { useStudentDetails, useWardenProfile } from '../queries/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';

function UpdateProfile() {
    const studentDetails = useStudentDetails({
        studentid: localStorage.getItem(localStorageKey.id),
    });

    const wardenProfile = useWardenProfile({
        wardenid: localStorage.getItem(localStorageKey.id),
    });

    var Filter = require('bad-words'),
        filter = new Filter();

    const params = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [github, setGithub] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [instagram, setInstagram] = useState("")
    const [twitter, setTwitter] = useState("")
    const [bio, setBio] = useState("")
    const [error, setError] = useState([]);
    const [file, setFile] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState("https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true");
    const [updated, setUpdated] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setName(studentDetails?.data?.student?.profile?.name);
        setPhone(studentDetails?.data?.student?.profile?.contactno);
        setGender(studentDetails?.data?.student?.profile?.gender);
        setGithub(studentDetails?.data?.student?.profile?.githubHandle);
        setLinkedin(studentDetails?.data?.student?.profile?.linkedinHandle);
        setInstagram(studentDetails?.data?.student?.profile?.instagramHandle);
        setTwitter(studentDetails?.data?.student?.profile?.twitterHandle);
        setBio(studentDetails?.data?.student?.profile?.description);
    }, [studentDetails.isSuccess]);

    useEffect(() => {
        setEmail(wardenProfile?.data?.message?.profile?.email);
        setPhone(wardenProfile?.data?.message?.profile?.contactno);
    }, [wardenProfile.isSuccess]);

    useEffect(() => {
        studentDetails?.data?.student?.profile?.picture && setImagePreviewUrl(studentDetails?.data?.student?.profile?.picture);
    }, [studentDetails.isSuccess]);

    useEffect(() => {
        wardenProfile?.data?.message?.profile?.picture && setImagePreviewUrl(wardenProfile?.data?.message?.profile?.picture);
    }, [wardenProfile.isSuccess]);

    useEffect(() => {
        // Set message to empty string after 3 seconds
        setTimeout(() => {
            setMessage("");
        }, 3000);
    }, [message]);

    const navigate = useNavigate();
    var errorLength = 0;

    const validate = () => {
        errorLength = 0;
        setError([]);
        if (params.user === "student") {
            if (name === "") {
                setError([...error, { type: "name", message: "Name is required" }]);
                errorLength++;
            }
            if (name !== "" && name.length < 3) {
                setError([...error, { type: "name", message: "Name must be atleast 3 characters long" }]);
                errorLength++;
            }
            if (phone === "") {
                setError([...error, { type: "phone", message: "Phone is required" }]);
                errorLength++;
            }
            if (phone.length > 0 && phone.length !== 10) {
                setError((error) => [
                    ...error,
                    { type: "phone", message: "Phone must be only of 10 digits" },
                ]);
                errorLength++;
            }
            if (phone.length > 0 && phone.match(/[0-9]/g) === null) {
                setError((error) => [
                    ...error,
                    { type: "phone", message: "Phone must contain only numbers" },
                ]);
                errorLength++;
            }

            if (github !== "" && github.match(/^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/i) === null) {
                setError((error) => [
                    ...error,
                    { type: "github", message: "Github link is not valid" },
                ]);
                errorLength++;
            }

            if (linkedin !== "" && linkedin.match(/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/gm) === null) {
                setError((error) => [
                    ...error,
                    { type: "linkedin", message: "Linkedin link is not valid" },
                ]);
                errorLength++;
            }

            if (instagram !== "" && instagram.match(/(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/igm) === null) {
                setError((error) => [
                    ...error,
                    { type: "instagram", message: "Instagram link is not valid" },
                ]);
                errorLength++;
            }

            if (twitter !== "" && twitter.match(/(?:https?:)?\/\/(?:www\.|m\.)?twitter\.com\/(\w{2,15})\/?(?:\?\S+)?(?:\#\S+)?$/igm) === null) {
                setError((error) => [
                    ...error,
                    { type: "twitter", message: "Twitter link is not valid" },
                ]);
                errorLength++;
            }

            if (bio !== "" && filter.isProfane(bio)) {
                setError((error) => [
                    ...error,
                    { type: "bio", message: "Profanity/Bad Word(s) not allowed in Bio" },
                ]);
                errorLength++;
            }
        } else if (params.user === "warden") {
            if (phone === "") {
                setError([...error, { type: "phone", message: "Phone is required" }]);
                errorLength++;
            }
            if (phone.length > 0 && phone.length !== 10) {
                setError((error) => [
                    ...error,
                    { type: "phone", message: "Phone must be only of 10 digits" },
                ]);
                errorLength++;
            }
            if (phone.length > 0 && phone.match(/[0-9]/g) === null) {
                setError((error) => [
                    ...error,
                    { type: "phone", message: "Phone must contain only numbers" },
                ]);
                errorLength++;
            }

            if (email === "") {
                setError([...error, { type: "email", message: "Email is required" }]);
                errorLength++;
            }

            if (email !== "" && email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm) === null) {
                setError((error) => [
                    ...error,
                    { type: "email", message: "Email is not valid" },
                ]);
                errorLength++;
            }
        }

        if (errorLength === 0) {
            return true;
        } else {
            return false;
        }
    }

    const { mutateAsync: updateStudentDetails } = useMutateUpdateStudentDetails({
        onSuccess: (data) => {
            if (data.message === "Student Profile Updated!") {
                navigate(`/${params.user}/profile`);
            }
            else {
                console.log(data.message);
            }
        },
        onError: () => { }
    });

    const { mutateAsync: updateWardenProfile } = useMutateUpdateWardenProfile({
        onSuccess: (data) => { },
        onError: () => { }
    });

    const photoUpload = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setFile(file);
            setImagePreviewUrl(reader.result);
            setUpdated(true);
        }
        reader.readAsDataURL(file);
    }

    const uploadProfilePicture = async () => {
        var bodyFormData = new FormData()
        bodyFormData.append('file', file);

        const result = fetch(baseurl + "/uploadProfilePic" + "?filename=" + (params.user === "student" ? studentDetails?.data?.student?.profile?.studentid : wardenProfile?.data?.message?.profile?.wardenid) + '.' + file.name.split('.')[1] + "&id=" + (params.user === "student" ? studentDetails?.data?.student?.studentid : wardenProfile?.data?.message?.profile?.wardenid), {
            method: 'POST',
            body: bodyFormData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(localStorageKey.jwtToken),
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.message === "Profile pic updated successfully!") {
                setUpdated(false);
                setMessage(data.message);
            }
            else {
                console.log(data.message);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const ImgUpload = ({ onChange, src }) =>
        <label htmlFor="photo-upload" className={`rounded-full inline-block relative border-4 border-primary hover:border-yellow-700 transition-colors ease-in-out cursor-pointer ${params.user === "student" ? 'mt-2' : "mt-4"}  shadow-xl hover:shadow-none`}>
            <div className="rounded-full overflow-hidden w-24 h-24 relative">
                <img htmlFor="photo-upload" src={src} className="w-auto h-24 object-cover" alt="profile" />
            </div>
            <input id="photo-upload" type="file" name='photo-upload' onChange={onChange} className="hidden" />
        </label >

    const Edit = ({ onSubmit, children, }) =>
        <div className="card">
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </div>

    return (
        <div className="flex" >
            {studentDetails?.data?.student || wardenProfile?.data?.message ? (
                <div className="w-3/5 my-auto">
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-200 p-3 rounded-full border-4 border-gray-300 shadow-lg">
                            <FontAwesomeIcon icon={solid("pen-nib")} size="2x" className="text-primary rounded-full" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mt-2">Update Profile</h1>
                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                        <Edit>
                            <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
                        </Edit>
                        {updated ? <button className='bg-primary font-roboto text-gray-900 text-sm hover:text-gray-100 px-3 py-1 rounded-lg font-medium shadow-md hover:shadow-none' onClick={uploadProfilePicture}>Upload</button> : null}
                    </div>
                    {message !== "" ? <div className="text-center text-green-700 transition-all ease-in-out text-xs pt-1">{message}</div> : null}
                    <div className={`flex gap-4 mx-auto ${params.user === "student" ? 'mt-4' : 'mt-6'} w-3/4`}>
                        {params.user === "student" ? <div className='w-full'>
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
                            {error.map((error) => {
                                if (error.type === "name") {
                                    return <p className="text-red-500 text-xs italic">{error.message}</p>;
                                }
                            })}
                        </div>
                            : null}
                        {params.user === "warden" ? <div className='w-full'>
                            <TextField
                                id="email"
                                label="Email"
                                type="text"
                                value={email}
                                variant="outlined"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full shadow"
                                size='small'
                            />
                            {error.map((error) => {
                                if (error.type === "email") {
                                    return <p className="text-red-500 text-xs italic">{error.message}</p>;
                                }
                            })}
                        </div>
                            : null}
                        <div className='w-full'>
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
                            {error.map((error) => {
                                if (error.type === "phone") {
                                    return <p className="text-red-500 text-xs italic">{error.message}</p>;
                                }
                            })}
                        </div>
                    </div>
                    {params.user === "student" ? <div className="flex items-center gap-4 mx-auto mt-3 w-3/4">
                        <div className='w-full'>
                            <FormControl className='w-full shadow' size='small'>
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select
                                    labelId="gender"
                                    id="gender"
                                    value={gender || ''}
                                    label="gender"
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                    <MenuItem value={"Other"}>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='w-full'>
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
                            {error.map((error) => {
                                if (error.type === "github") {
                                    return <p className="text-red-500 text-xs italic">{error.message}</p>;
                                }
                            })}
                        </div>
                    </div>
                        : null}
                    {params.user === "student" ?
                        <div className="flex items-center gap-4 mx-auto mt-3 w-3/4">
                            <div className='w-full'>
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
                                {error.map((error) => {
                                    if (error.type === "linkedin") {
                                        return <p className="text-red-500 text-xs italic">{error.message}</p>;
                                    }
                                })}
                            </div>
                            <div className='w-full'>
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
                                {error.map((error) => {
                                    if (error.type === "instagram") {
                                        return <p className="text-red-500 text-xs italic">{error.message}</p>;
                                    }
                                })}
                            </div>
                        </div>
                        : null}
                    {params.user === "student" ?
                        <div className="flex items-center gap-4 mx-auto mt-3 w-3/4">
                            <div className='w-full'>
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
                                {error.map((error) => {
                                    if (error.type === "twitter") {
                                        return <p className="text-red-500 text-xs italic">{error.message}</p>;
                                    }
                                })}
                            </div>
                            <div className='w-full'></div>
                        </div>
                        : null}
                    {params.user === "student" ?
                        <div className="flex flex-col items-center gap-4 mx-auto mt-3 w-3/4">
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
                            {error.map((error) => {
                                if (error.type === "bio") {
                                    return <p className="text-red-500 text-xs italic -mt-3">{error.message}</p>;
                                }
                            })}
                        </div>
                        : null}
                    <span>
                        {/* <p className="text-center mb-4 text-sm text-green-500">{successMessage}</p> */}
                    </span>

                    <div className={`mx-auto text-center ${params.user === "student" ? 'mt-4' : 'mt-8'}`}>
                        {params.user === "student" ? <button
                            className="text-white bg-green-700 hover:bg-green-900 font-medium shadow-lg transition-all ease-in-out hover:shadow-none px-4 py-1 rounded-lg"
                            onClick={(e) => {
                                e.preventDefault();
                                validate() && updateStudentDetails({
                                    "studentid": studentDetails?.data?.student?.profile?.studentid,
                                    "name": name,
                                    "gender": gender,
                                    "description": bio,
                                    "contactno": phone || studentDetails?.data?.student?.profile?.contactno,
                                    "instagramHandle": instagram || "",
                                    "linkedinHandle": linkedin || "",
                                    "githubHandle": github || "",
                                    "twitterHandle": twitter || "",
                                })
                            }}
                        >
                            Update
                        </button>
                            : <button
                                className="text-white bg-green-700 hover:bg-green-900 font-medium shadow-lg transition-all ease-in-out hover:shadow-none px-4 py-1 rounded-lg"
                                onClick={(e) => {
                                    e.preventDefault();
                                    validate() && updateWardenProfile({
                                        "email": email || wardenProfile?.data?.warden?.profile?.email,
                                        "contactno": phone || wardenProfile?.data?.warden?.profile?.contactno,
                                    })
                                }}
                            >
                                Update
                            </button>}
                        <button className="text-white ml-6 bg-red-500 hover:bg-red-700 font-medium shadow-lg transition-all ease-in-out hover:shadow-none px-4 py-1 rounded-lg" onClick={() => navigate(`/${params.user}/profile`)}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : <div className='w-2/3'>
                <Loader />
            </div>
            }
            <img src={Issue} alt="" className="w-2/5 bg-no-repeat bg-cover bg-center h-screen" />
        </div >
    )
}

export default UpdateProfile