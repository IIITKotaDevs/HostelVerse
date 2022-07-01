import React from 'react';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'


export default function Error404() {
    const navigate = useNavigate();
    return (
        <div className='bg-landing-background bg-cover h-screen grid grid-cols-2 font-roboto'>
            <div></div>
            <div className='flex flex-col items-center my-auto text-center'>
                <p className='font-rubik text-[200px] text-gray-900'>404</p>
                <p className='text-xl font-semibold text-gray-900 -mt-12'>Page Not Found</p>
                <button className='bg-green-600 hover:bg-green-800 text-white font-medium text-sm shadow-lg hover:shadow-none transition-all px-4 py-1 rounded-md mt-2' onClick={() => navigate('/')}>Return Back Home</button>
            </div>
        </div>
    )
}
