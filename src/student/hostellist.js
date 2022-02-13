import React, { useEffect, useState } from 'react'
import { Menu } from '@headlessui/react'
import Slider from "@material-ui/core/Slider";
import axios from "axios"
import baseurl from '../config';
import { useNavigate } from 'react-router-dom';

function HostelList() {
    const [val, setVal] = useState([5000, 15000])
    const [hostelData, setHostelData] = useState([])
    const navigate = useNavigate()
    
    const updateChange = (e, data) => {
        e.preventDefault()
        setVal(data)
    }

    const getHostels = async() => {
        const hostels = await axios.post(`${baseurl}/hostelFilterByFees`,
            {
                low: val[0],
                high: val[1]
            },
            {
                headers: {
                Authorization: localStorage.getItem("jwtToken")
                    ? `Bearer ${localStorage.getItem("jwtToken")}`
                    : "",
                "Content-type": "application/json",
            },
        });
        setHostelData(hostels.data.HostelList)
    }

    useEffect(() => {
        getHostels()
    }, [val])

    console.log(hostelData)

    return (
        <div className="grid grid-cols-12 p-16">
            <div className="col-span-2">
                <Menu>
                    {({ open }) => (
                        <>
                            <Menu.Button className="hover:text-blue-500 my-2 rounded-md border-gray-400 border-2 p-2 w-28">
                                Fees
                            </Menu.Button>
                            <div className="w-40">
                                <Slider
                                    value={val}
                                    onChange={updateChange}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={25000}
                                />
                            </div>
                        </>
                    )}
                </Menu>
            </div>

            <div className="col-span-10 border-l-4 grid grid-cols-3">
                {hostelData && hostelData.map(hostel => {
                    return (
                        <div onClick={() => {navigate(`./${hostel.hostelid}`)}} className="text-center border-2 rounded-lg mx-8 mb-8 shadow-lg h-40">
                            <h1 className="font-bold text-xl my-2">{hostel.hostelname}</h1>
                            <h1 className="text-gray-500">{hostel.location} | ₹{hostel.fees}/month</h1>
                            <h1 className="text-gray-500">{hostel.stars}⭐️ | {hostel.totalrooms} students </h1>
                            <h1 className="text-lg font-bold mt-2">Seats Left: {hostel.roomsleft}</h1>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default HostelList