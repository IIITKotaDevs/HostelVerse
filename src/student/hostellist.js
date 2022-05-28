import React, { useEffect, useState } from 'react'
import { Menu } from '@headlessui/react'
import Slider from "@material-ui/core/Slider";
import axios from "axios"
import baseurl from '../config';
import { useNavigate } from 'react-router-dom';
import { localStorageKey } from "../utils/localStorageKey";

function HostelList() {
    const [val, setVal] = useState([5000, 15000])
    const [hostelData, setHostelData] = useState([])
    const navigate = useNavigate()

    const updateChange = (e, data) => {
        e.preventDefault()
        setVal(data)
    }

    const getHostels = async () => {
        const hostels = await axios.get(`${baseurl}/hostelList`, {
            params: {
                low: val[0],
                high: val[1]
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(localStorageKey.jwtToken)}`
            },
        })
        setHostelData(hostels.data)
    }

    useEffect(() => {
        getHostels()
    }, [val])

    return (
        <div className="py-8 px-8">
            <div className="">
                <Menu>
                    {({ open }) => (
                        <div className='flex flex-col items-center'>
                            <Menu.Button className="text-gray-900 font-semibold italic text-lg">
                                Fees
                            </Menu.Button>
                            <div className="w-1/2">
                                <Slider
                                    name="fees"
                                    value={val}
                                    onChange={updateChange}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    marks={[{ value: 0, label: '0' }, { value: 5000, label: '5000' }, { value: 10000, label: '10000' }, { value: 15000, label: '15000' }, { value: 20000, label: '20000' }, { value: 25000, label: '25000' }, { value: 30000, label: '30000' }]}
                                    min={0}
                                    max={30000}
                                />
                            </div>
                        </div>
                    )}
                </Menu>
            </div>

            <div className="col-span-10 border-l-4 grid grid-cols-3">
                {hostelData && hostelData.map(hostel => {
                    return (
                        <div onClick={() => { navigate(`./ ${hostel.hostelid}`) }} className="text-center border-2 rounded-lg mx-8 mb-8 shadow-lg h-40">
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