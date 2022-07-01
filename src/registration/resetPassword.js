import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [eyePassword, setEyePassword] = useState(false);
    const [eyeConfirmPassword, setEyeConfirmPassword] = useState(false);
    const [error, setError] = useState([]);
    const [message, setMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    var errorLength = 0;
    const query = new URLSearchParams(window.location.search);
    const validate = () => {
        setError([]);
        errorLength = 0;
        if (newPassword.length === 0) {
            setError((error) => [
                ...error,
                { type: "New Password", message: "Password is required" },
            ]);
            errorLength++;
        }
        if (newPassword.length > 0 && newPassword.length < 8) {
            setError((error) => [
                ...error,
                { type: "New Password", message: "Password must be atleast 8 characters" },
            ]);
            errorLength++;
        }
        if (newPassword.length >= 8 && newPassword.match(/[a-z]/g) === null) {
            setError((error) => [
                ...error,
                {
                    type: "New Password",
                    message: "Password must contain atleast one lowercase letter",
                },
            ]);
            errorLength++;
        }
        if (newPassword.length >= 8 && newPassword.match(/[A-Z]/g) === null) {
            setError((error) => [
                ...error,
                {
                    type: "New Password",
                    message: "Password must contain atleast one uppercase letter",
                },
            ]);
            errorLength++;
        }
        if (newPassword.length >= 8 && newPassword.match(/[0-9]/g) === null) {
            setError((error) => [
                ...error,
                {
                    type: "New Password",
                    message: "Password must contain atleast one number",
                },
            ]);
            errorLength++;
        }
        if (
            newPassword.length >= 8 &&
            newPassword.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) === null
        ) {
            setError((error) => [
                ...error,
                {
                    type: "New Password",
                    message: "Password must contain atleast one special character",
                },
            ]);
            errorLength++;
        }
        if (newPassword.length >= 8 && confirmPassword === "") {
            setError((error) => [
                ...error,
                { type: "Confirm Password", message: "Confirm Password is required" },
            ]);
            errorLength++;
        }
        if (
            newPassword.length >= 8 &&
            confirmPassword.length > 0 &&
            newPassword !== confirmPassword
        ) {
            setError((error) => [
                ...error,
                {
                    type: "Confirm Password",
                    message: "Password and Confirm Password must be same",
                },
            ]);
            errorLength++;
        }

        if (errorLength === 0) {
            return true;
        }
        return false;
    }

    const handleSubmit = (e) => {
        setLoading(true);
        fetch('https://hostelverse-backend.azurewebsites.net/api/resetPassword' + `?token=${query.get('token')}&newPassword=${newPassword}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Password changed successfully!') {
                    setLoading(false);
                    setMessage(true)
                    setNewPassword('');
                    setConfirmPassword('');
                }
                else {
                    setError((error) => [
                        ...error,
                        { type: "Submit", message: data.message },
                    ]);
                    errorLength++;
                    setLoading(false);
                }
            })
            .catch(error => {
                setError((error) => [
                    ...error,
                    { type: "Submit", message: "Something went wrong" },
                ]);
                errorLength++;
                setLoading(false);
            })
    }

    return (
        <div className='bg-landing-background bg-cover h-screen grid grid-cols-2 font-roboto'>
            <div></div>
            <div className="flex flex-col items-center my-auto text-center">
                <p className="font-bold text-4xl mb-4">HOSTELVERSE 😇</p>
                <p className="text-xl font-medium">Reset Password</p>
                <div className="bg-white w-80 rounded-lg my-4 shadow-lg text-sm flex justify-between items-center gap-4">
                    <input
                        type={eyePassword ? "text" : "password"}
                        className="py-2 px-4 rounded-lg w-full"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <FontAwesomeIcon
                        icon={eyePassword ? solid("eye") : solid("eye-slash")}
                        className="h-3.5 text-gray-800 pr-4"
                        onClick={() => setEyePassword(!eyePassword)}
                    />
                </div>
                {error.length > 0
                    ? error.map((item, index) => {
                        if (item.type === "New Password") {
                            return (
                                <span className="text-red-500 -mt-2 mb-2 text-xs" key={index}>
                                    {item.message}
                                </span>
                            );
                        }
                    })
                    : null}
                <div className="bg-white w-80 rounded-lg mb-4 shadow-lg text-sm flex justify-between items-center gap-4">
                    <input
                        type={eyeConfirmPassword ? "text" : "password"}
                        className="py-2 px-4 rounded-lg w-full"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <FontAwesomeIcon
                        icon={eyeConfirmPassword ? solid("eye") : solid("eye-slash")}
                        className="h-3.5 text-gray-800 pr-4"
                        onClick={() => setEyeConfirmPassword(!eyeConfirmPassword)}
                    />
                </div>
                {error.length > 0
                    ? error.map((item, index) => {
                        if (item.type === "Confirm Password") {
                            return (
                                <span className="text-red-500 -mt-2 mb-2 text-xs" key={index}>
                                    <p>
                                        {item.message}
                                    </p>
                                </span>
                            );
                        }
                    })
                    : null}
                {error.length > 0
                    ? error.map((item, index) => {
                        if (item.type === "Submit") {
                            return (
                                <span className="text-red-500 -mt-2 mb-1 text-xs" key={index}>
                                    <p>
                                        {item.message}
                                    </p>
                                </span>
                            );
                        }
                    })
                    : null}
                {message ? <div className="text-green-700 text-xs mb-2 -mt-1 flex gap-1 items-center">
                    <FontAwesomeIcon icon={solid("check-circle")} className="text-xs" />
                    <p>Password changed successfully!</p>
                    <a href="/sign-in" className="text-blue-700 cursor-pointer">Sign In</a>
                </div> : null}
                <button
                    className="px-10 py-2 bg-black text-white font-medium rounded-lg"
                    onClick={(e) => {
                        e.preventDefault();
                        validate() && handleSubmit()
                    }}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>

            </div>

        </div>
    )
}
