import React from 'react'
import man from '../assets/img/man.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Profile() {
    return (
        <>
            <div className='flex flex-col items-center pt-12 bg-profile bg-cover h-screen'>
                <div className='flex gap-4 items-center'>
                    <p className='font-bold text-3xl'>Profile</p>
                    <FontAwesomeIcon icon={solid('pen')} className="text-xl" />
                </div>
                <img src={man} alt="" className='w-32 h-32 my-4' />
                <p className='text-sm'>Name</p>
                <p className='text-lg font-bold mt-0.5'>Wade Warren</p>
                <p className='text-sm mt-3'>Name</p>
                <p className='text-lg font-bold mt-0.5'>Wade Warren</p>
                <p className='text-sm mt-3'>Name</p>
                <p className='text-lg font-bold mt-0.5'>Wade Warren</p>
                <p className='text-sm mt-3'>Name</p>
                <p className='text-lg font-bold mt-0.5'>Wade Warren</p>
                <p className='text-sm mt-3'>Name</p>
                <p className='text-lg font-bold mt-0.5'>Wade Warren</p>
                <p className='text-sm mt-3'>Name</p>
                <p className='text-lg font-bold mt-0.5'>Wade Warren</p>
                <p className='text-sm mt-3'>Name</p>
                <p className='text-lg font-bold mt-0.5'>Wade Warren</p>
            </div>
        </>
    )
}
