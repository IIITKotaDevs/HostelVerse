import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Hostel from '../assets/img/hostel.jpeg'
import Man from '../assets/img/man.svg'
import axios from "axios"
import baseurl from "../config"

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
        const hostel = await axios.post(`${baseurl}/getHostel`,
        {
            hostelid: params.id
        },
        )
        setHostelData(hostel.data.hostel)
        // console.log(hostel.data.hostel)
    }

  if(!hostelData)
    return null
  return (
    <div>
        <img className="w-full" src={Hostel}></img>

        <div className="text-center">
            <h1 className="font-bold text-3xl bg-white z-40 w-40 mx-auto p-4 -mt-8">{hostelData.hostelname}</h1>
        </div>

        <div className="rounded-xl py-4 grid grid-cols-4 drop-shadow-[15px_15px_15px_rgba(0,0,0,0.25)] text-center bg-white mx-60">
            <div className="col-span-1"></div>
            <div className="col-span-1 text-2xl">{hostelData.overallRating}/5</div>
            <div className="col-span-1">{hostelData.numberOfReviews} reviews</div>
            <div className="col-span-1"></div>
        </div>

        <h1 className="text-orange-400 font-bold mx-24 text-3xl mt-20">Description</h1>
        <p className="text-lg mx-24 mt-4">{hostelData.description}</p>

        <h1 className="text-orange-400 font-bold mx-24 text-3xl mt-20">Room Type</h1>
        <img className="w-24 mx-24 mt-4" src={Man} />
        <h1 className="text-2xl mx-24 mt-4">{hostelData.roomtype} - seater</h1>

        <h1 className="text-orange-400 font-bold mx-24 text-3xl mt-20">Feedback</h1>
        <div className="grid grid-cols-3 gap-4">
        {feedbacks.map(feedback => {
            return(
                <div className="mx-24 mt-4 border-dashed border-2 col-span-1">
                    <h1 className="text-xl font-bold p-2">{feedback.name}</h1>
                    <h1 className="text-2xl p-2">Rating: {feedback.rating}/5</h1>
                    <p className="text-lg p-2">{feedback.message}</p>
                </div>
            )
        })}
        </div>

        <div className="my-4 bg-yellow-500 grid grid-cols-5">
            <div className="mx-24 my-8 col-span-3">
                <h1 className="text-3xl font-bold">₹{hostelData.fees}/month</h1>
                <h1 className="text-xl">Available: {hostelData.roomsleft} | Max Capacity: {hostelData.totalrooms}</h1>
            </div>
            <div className="my-8 col-span-2">
                <button className="bg-black text-white py-2 px-8 text-3xl rounded-3xl">Apply Now</button>
            </div>
        </div>

    </div>
  )
}

export default HostelDetail