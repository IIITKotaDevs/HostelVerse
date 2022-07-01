import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function RequestResetPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    var errorLength = 0;
    const validate = () => {
        setError([]);
        errorLength = 0;
        if (email.length === 0) {
            setError((error) => [
                ...error,
                { type: "Email", message: "Email is required" },
            ]);
            errorLength++;
        }
        if (email.length > 0 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setError((error) => [
                ...error,
                { type: "Email", message: "Invalid email" },
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
        fetch('https://hostelverse-backend.azurewebsites.net/api/requestResetPassword' + `?email=${email}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Reset password email sent successfully!') {
                    setLoading(false);
                    setMessage('Check your email for reset password link');
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
                <p className="text-xl font-medium">Enter Registered Email</p>
                <input
                    type="text"
                    className="bg-white w-80 px-4 py-2 rounded-xl my-4"
                    placeholder="Registered Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error.length > 0
                    ? error.map((item, index) => {
                        if (item.type === "Email") {
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
                                <span className="text-red-500 -mt-2 mb-2 text-xs" key={index}>
                                    <p>
                                        {item.message}
                                    </p>
                                </span>
                            );
                        }
                    })
                    : null}
                {message ? <p className="text-green-700 -mt-2 mb-2 text-xs italic">{message}</p> : null}
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
        </div >
    )
}
