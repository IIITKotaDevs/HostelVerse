import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Hostel from '../assets/img/hostel.jpg'
import Man from '../assets/img/man.svg'
import { useHostelDetails } from "../queries/hooks"

function HostelDetail(id) {
    const feedbacks = [
        {
            name: "Vinamra",
            rating: 0,
            message: "Awful",
        },
        {
            name: "Himanshu",
            rating: 4,
            message: "Very good hostel",
        }
    ]
    const params = useParams();

    const hostelDetails = useHostelDetails({
        hostelid: params.id
    })

    return (
        <div>
            <img className="w-full" src={Hostel}></img>
            <div className="text-center">
            </div>

            <div className="rounded-xl py-6 items-center drop-shadow-[15px_15px_15px_rgba(0,0,0,0.25)] text-center bg-white mx-auto -mt-28 w-1/2">
                <h1 className="font-bold text-3xl">{hostelDetails?.data?.data?.name}</h1>
                <p className='font-medium text-gray-700'>{hostelDetails?.data?.data?.location}</p>
                <div className='flex items-center justify-around mt-4 text-sm'>
                    <p className={`${hostelDetails?.data?.data?.overallRating >= 4 ? 'bg-green-500 text-white border-1 border-green-400' : (hostelDetails?.data?.data?.overallRating >= 2 ? 'bg-yellow-500' : 'bg-red-500 text-white')} px-2 py-1 rounded-md shadow-md`}>{hostelDetails?.data?.data?.overallRating ? (<><span className='text-xl font-bold'> {hostelDetails?.data?.data?.overallRating} </span> <span className='text-xs'> Out of 5</span></>) : "Not rated yet"}</p>
                    <div className='text-right'>
                        <p className='font-bold text-base text-gray-800'>{hostelDetails?.data?.data?.overallRating >= 4 ? 'Excellent' : (hostelDetails?.data?.data?.overallRating >= 3 ? 'Good' : (hostelDetails?.data?.data?.overallRating >= 2 ? 'Average' : (hostelDetails?.data?.data?.overallRating >= 1 ? 'Poor' : 'Awful')))}</p>
                        <p className='text-xs'>Based on <span className='font-medium'>{hostelDetails?.data?.data?.numberOfReviews ? `${hostelDetails?.data?.data?.numberOfReviews} reviews` : "No reviews yet"}</span></p>
                    </div>
                </div>
            </div>

            <h1 className="text-orange-400 font-bold mx-24 text-3xl mt-20">Description</h1>
            <p className="text-lg mx-24 mt-4">{hostelDetails?.data?.data?.description}</p>

            <h1 className="text-orange-400 font-bold mx-24 text-3xl mt-20">Room Type</h1>
            <div className='mx-24 flex justify-between'>
                <div className='flex flex-col items-center'>
                    <img className="w-16 mt-4" src={Man} />
                    <h1 className="text-2xl mt-4">Single-Seater</h1>
                    <p>Seats: {hostelDetails?.data?.data?.singleRooms}</p>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='flex mt-4'>
                        <img className="w-16" src={Man} />
                        <img className="w-16 -ml-4" src={Man} />
                    </div>
                    <h1 className="text-2xl mt-4">Double-Seater</h1>
                    <p>Seats: {hostelDetails?.data?.data?.doubleRooms}</p>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='flex mt-4'>
                        <img className="w-16" src={Man} />
                        <img className="w-16 -ml-4" src={Man} />
                        <img className="w-16 -ml-4" src={Man} />
                    </div>
                    <h1 className="text-2xl mt-4">Triple-Seater</h1>
                    <p>Seats: {hostelDetails?.data?.data?.tripleRooms}</p>
                </div>
            </div>

            <h1 className="text-orange-400 font-bold mx-24 text-3xl mt-20">Feedback</h1>
            <div className="mx-24 mb-44">
                {feedbacks.map(feedback => {
                    return (
                        <div className='mt-4 border-dashed border-2 px-8 py-4 flex items-center gap-4' key={feedback.name}>
                            <div>
                                <img src={Man} alt="" className='w-12' />
                            </div>
                            <div className="">
                                <h1 className="text-xl font-bold">{feedback.name}</h1>
                                <h1 className="text-lg">Rating: {feedback.rating}/5</h1>
                                <p className="text-sm">{feedback.message}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="bg-yellow-500 flex justify-between px-24 items-center fixed bottom-0 w-full py-2 shadow-inner">
                <div className="">
                    <h1 className="text-2xl font-bold">₹{hostelDetails?.data?.data?.fees}/month</h1>
                    <h1 className="">Available: {hostelDetails?.data?.data?.singleRoomsLeft} Single, {hostelDetails?.data?.data?.doubleRoomsLeft} Double, {hostelDetails?.data?.data?.tripleRooms} Triple | Max Capacity: {hostelDetails?.data?.data?.totalCapacity}</h1>
                </div>
                <div className="">
                    <button className="bg-black text-white py-2 px-8 text-lg rounded-3xl">Apply Now</button>
                </div>
            </div>

        </div>
    )
}

export default HostelDetail