import React from 'react';
import { useNavigate } from 'react-router-dom'

export default function Landing() {
    const navigate = useNavigate();
    return (
        <div className='bg-landing-background bg-cover h-screen grid grid-cols-2 font-roboto'>
            <div></div>
            <div className='flex flex-col items-center my-auto text-center'>
                <p className='text-gray-700 text-2xl'>Enter into the magical world of</p>
                <p className='font-bold text-4xl'>HOSTELVERSE 😇</p>
                <p className='mt-5 w-1/2 text-gray-700 text-lg'>We have created an awesome app to tackle the problems related to hostels. Tighten your seat belt to go into a fascinating journey.</p>
                <button className='py-3 px-10 bg-black text-white font-bold rounded-lg mt-4' onClick={() => navigate('/sign-up')}>Get Started</button>
            </div>
        </div>
    )
}
