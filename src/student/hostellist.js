import React, { useEffect, useState } from 'react'
import { Menu } from '@headlessui/react'
import Slider from "@material-ui/core/Slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import axios from "axios"
import baseurl from '../config';

function HostelList() {
    const [val, setVal] = useState([5000, 15000])
    const [seats, setSeats] = useState(20)
    const [hostels, setHostels] = useState([])
    const [location, setLocation] = useState('Jaipur')
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('You submitted the input')
    }
    const updateChange = (e, data) => {
        e.preventDefault()
        setVal(data)
    }
    const updateSeats = (e, data) => {
        e.preventDefault()
        setSeats(data)
    }

    useEffect(() => {
        getHostels()
    }, [])

    const getHostels = async() => {
        const hostels = await axios.get(`${baseurl}/getHostelList`)
        setHostels(hostels.data)
    }

    return (
        <div className="grid grid-cols-12 p-16">
            <div className="col-span-2">
                <Menu>
                    {({ open }) => (
                        <>
                            <Menu.Button className="hover:text-blue-500 my-2 rounded-md border-gray-400 border-2 p-2 w-28">
                                Fees <FontAwesomeIcon icon={solid('angle-down')} />
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
                <br />
                <Menu>
                    {({ open }) => (
                        <>
                            <Menu.Button className="hover:text-blue-500 my-2 rounded-md border-gray-400 border-2 p-2 w-28">Location <FontAwesomeIcon icon={solid('angle-down')} /></Menu.Button>
                            {open && (
                                <div>
                                    <Menu.Items static>
                                        {/* <Menu.Item>
                                {({ active }) => ( */}
                                        <form onSubmit={handleSubmit}>
                                            <label>
                                                <textarea className="pl-2" type="text" name="name" placeholder={location} onChange={setLocation(location)} />
                                            </label>
                                            <input type="submit" value="Submit" className="border-2 px-2" />
                                        </form>
                                        {/* )}
                            </Menu.Item> */}
                                    </Menu.Items>
                                </div>
                            )}
                        </>
                    )}
                </Menu>
                <br />
                <Menu>
                    {({ open }) => (
                        <>
                            <Menu.Button className="hover:text-blue-500 my-2 rounded-md border-gray-400 border-2 p-2 w-28">Seats Left <FontAwesomeIcon icon={solid('angle-down')} /></Menu.Button>
                            <div className="w-40">
                                <Slider
                                    value={seats}
                                    onChange={updateSeats}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={400}
                                />
                            </div>
                        </>
                    )}
                </Menu>
            </div>


            <div className="col-span-10 border-l-4 grid grid-cols-3">
                {hostels.map(hostel => {
                    return (
                        <div className="text-center border-2 rounded-lg mx-8 shadow-lg h-40">
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