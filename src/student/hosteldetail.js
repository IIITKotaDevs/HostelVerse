import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Hostel from '../assets/img/hostel.jpg'
import Man from '../assets/img/man.svg'
import axios from "axios"
import baseurl from "../config"
import { localStorageKey } from "../utils/localStorageKey";

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
    console.log(params.id)
    const [hostelData, setHostelData] = useState(null)

    useEffect(() => {
        getHostel()
    }, [])

    const getHostel = async () => {
        const hostels = await axios.get(`${baseurl}/hostelList`, {
            params: {
                hostelid: params.id
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(localStorageKey.jwtToken)}`
            },
        })
        setHostelData(hostels.data.data)
    }

    if (!hostelData)
        return null
    return (
        <div>
            <img className="w-full" src={Hostel}></img>

            <div className="text-center">
            </div>

            <div className="rounded-xl py-6 items-center drop-shadow-[15px_15px_15px_rgba(0,0,0,0.25)] text-center bg-white mx-auto -mt-28 w-1/2">
                <h1 className="font-bold text-3xl">{hostelData?.name}</h1>
                <p className='font-medium text-gray-700'>{hostelData?.location}</p>
                <div className='flex justify-around mt-4 text-sm'>
                    <p>{hostelData.overallRating ? `${hostelData.overallRating}/5` : "Not rated yet"}</p>
                    <p>{hostelData.numberOfReviews ? `${hostelData.numberOfReviews} reviews` : "No reviews yet"}</p>
                </div>
            </div>

            <h1 className="text-orange-400 font-bold mx-24 text-3xl mt-20">Description</h1>
            <p className="text-lg mx-24 mt-4">{hostelData?.description}</p>

            <h1 className="text-orange-400 font-bold mx-24 text-3xl mt-20">Room Type</h1>
            <div className='mx-24 flex justify-between'>
                <div className='flex flex-col items-center'>
                    <img className="w-16 mt-4" src={Man} />
                    <h1 className="text-2xl mt-4">Single-Seater</h1>
                    <p>Seats: {hostelData?.singleRooms}</p>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='flex mt-4'>
                        <img className="w-16" src={Man} />
                        <img className="w-16 -ml-4" src={Man} />
                    </div>
                    <h1 className="text-2xl mt-4">Double-Seater</h1>
                    <p>Seats: {hostelData?.doubleRooms}</p>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='flex mt-4'>
                        <img className="w-16" src={Man} />
                        <img className="w-16 -ml-4" src={Man} />
                        <img className="w-16 -ml-4" src={Man} />
                    </div>
                    <h1 className="text-2xl mt-4">Triple-Seater</h1>
                    <p>Seats: {hostelData?.tripleRooms}</p>
                </div>
            </div>

            <h1 className="text-orange-400 font-bold mx-24 text-3xl mt-20">Feedback</h1>
            <div className="mx-24 mb-44">
                {feedbacks.map(feedback => {
                    return (
                        <div className='mt-4 border-dashed border-2 px-8 py-4 flex items-center gap-4'>
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
                    <h1 className="text-2xl font-bold">₹{hostelData.fees}/month</h1>
                    <h1 className="">Available: {hostelData.singleRoomsLeft} Single, {hostelData.doubleRoomsLeft} Double, {hostelData.tripleRooms} Triple | Max Capacity: {hostelData.totalCapacity}</h1>
                </div>
                <div className="">
                    <button className="bg-black text-white py-2 px-8 text-lg rounded-3xl">Apply Now</button>
                </div>
            </div>

        </div>
    )
}

export default HostelDetail