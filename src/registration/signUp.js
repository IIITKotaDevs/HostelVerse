import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("akash");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [id, setId] = useState("");
    const [gender, setGender] = useState("Male");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");

    const isValidated = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const userSignUp = () => {
        axios
            .post("https://hostelverse-aztecs.herokuapp.com/signup", {
                email: email,
                password: password,
                studentid: id,
                name: name,
                gender: gender,
                contactno: phone,
                location: location,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const validate = () => {
        if (name.length > 4) {
            if (isValidated(email)) {
                if (password.length > 7) {
                    if (password == confirmPassword) {
                        if (id.length > 0) {
                            if (phone.length > 9) {
                                if (location.length > 5) {
                                    userSignUp();
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    return (
        <div className="bg-landing-background bg-cover h-screen grid grid-cols-2 font-roboto">
            <div></div>
            <div className="flex flex-col items-center my-auto text-center">
                <p className="font-bold text-4xl mb-4">HOSTELVERSE 😇</p>
                <p className="text-xl font-medium">Sign Up</p>
                <div className="flex flex-col">
                    <input
                        type="text"
                        className="bg-white w-80 px-4 py-2 rounded-xl my-4"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
                        placeholder="College Id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <div className="flex-row pb-4 w-80 flex justify-evenly">
                        <div className="align-middle">
                            <input
                                type="radio"
                                className="bg-white mr-2"
                                checked={gender === "Male"}
                                onChange={() => setGender("Male")}
                            />
                            <label>Male</label>
                        </div>
                        <div className="align-middle">
                            <input
                                type="radio"
                                className="bg-white mr-2"
                                checked={gender === "Female"}
                                onChange={() => setGender("Female")}
                            />
                            <label>Female</label>
                        </div>
                    </div>
                    <input
                        type="text"
                        className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
                        placeholder="Contact No."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        type="text"
                        className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="px-10 py-2 bg-black text-white font-medium rounded-lg"
                    onClick={() => navigate("/otp")}
                >
                    Submit
                </button>
                <p className="mt-2 ">
                    Already have an Account ?
                    <p
                        className="cursor-pointer underline text-blue-700"
                        onClick={() => navigate("/sign-in")}
                    >
                        Sign In
                    </p>
                </p>
            </div>
        </div>
    );
}