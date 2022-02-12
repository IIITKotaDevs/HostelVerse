import React from 'react'
import { useParams } from 'react-router-dom'
import Hostel from '../assets/img/hostel.jpeg'
import Man from '../assets/img/man.svg'

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
    const hostel = { rating: 4.5, ratings: 20, reviews: 5, description: "This is the best hostel.", seater: 1 }
  return (
    <div>
        <img className="w-full" src={Hostel}></img>

        <div className="text-center">
            <h1 className="font-bold text-3xl bg-white z-40 w-40 mx-auto p-4 -mt-8">Hostel 1</h1>
        </div>

        <div className="rounded-xl py-4 grid grid-cols-5 drop-shadow-[15px_15px_15px_rgba(0,0,0,0.25)] text-center bg-white mx-60">
            <div className="col-span-1"></div>
            <div className="bg-green col-span-1 text-2xl">{hostel.rating}/5</div>
            <div className="col-span-1">{hostel.ratings} ratings</div>
            <div className="col-span-1">{hostel.reviews} reviews</div>
            <div className="col-span-1"></div>
        </div>

        <h1 className="text-orange-400 font-bold mx-24 text-3xl mt-20">Description</h1>
        <p className="text-lg mx-24 mt-4">{hostel.description}</p>

        <h1 className="text-orange-400 font-bold mx-24 text-3xl mt-20">Room Type</h1>
        <img className="w-24 mx-24 mt-4" src={Man} />
        <h1 className="text-2xl mx-24 mt-4">{hostel.seater} - seater</h1>

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

    </div>
  )
}

export default HostelDetail