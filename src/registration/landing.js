import React from 'react';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'


export default function Landing() {
    const navigate = useNavigate();
    return (
        <div className='bg-landing-background bg-cover h-screen grid grid-cols-2 font-roboto'>
            <div></div>
            <div className='flex flex-col items-center my-auto text-center'>
                <p className='text-gray-700 text-2xl'>Enter into the magical world of</p>
                <p className='font-bold text-4xl'>HOSTELVERSE 😇</p>
                <p className='mt-5 w-1/2 text-gray-700 text-lg'>We have created an awesome app to tackle the problems related to hostels. Tighten your seat belt to go into a fascinating journey.</p>
                <div className='flex gap-4 mt-4'>
                    <button className='py-2 px-8 bg-black text-white font-bold rounded-lg flex items-center gap-1' onClick={() => navigate('/sign-up')}>
                        <p>Create Account</p>
                        <FontAwesomeIcon icon={solid('angle-right')} className="w-3.5 h-3.5" />
                    </button>
                    <button className='py-2 px-8 bg-black text-white font-bold rounded-lg flex items-center gap-1' onClick={() => navigate('/sign-in')}>
                        <p>Login</p>
                        <FontAwesomeIcon icon={solid('angle-right')} className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
