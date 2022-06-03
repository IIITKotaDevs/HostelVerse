import React, { useEffect, useState } from 'react'
import { Menu } from '@headlessui/react'
import Slider from "@material-ui/core/Slider";
import { useNavigate } from 'react-router-dom';
import { useHostelList } from '../queries/hooks';
import Man from '../assets/img/man.svg'
import Rating from '@mui/material/Rating';

function HostelList() {
    const [val, setVal] = useState([0, 30000])
    const [hostelData, setHostelData] = useState([])
    const navigate = useNavigate()

    const updateChange = (e, data) => {
        e.preventDefault()
        setVal(data)
    }

    const hostelList = useHostelList({
        low: val[0],
        high: val[1],
    })

    useEffect(() => {
        setHostelData(hostelList.data)
    }, [hostelList.isSuccess === true])

    useEffect(() => {
        hostelList.refetch()
    }, [val])

    return (
        <div className="py-8 px-8 divide-y-4 divide-gray-200">
            <div className="pb-4">
                <p className='text-3xl font-bold text-gray-900 text-center mb-4'>Hostel List</p>
                < Menu >
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
                    )
                    }
                </Menu >
            </div >

            <div className="flex flex-col items-center pt-8">
                {hostelData?.data && hostelData.data.map(hostel => {
                    return (
                        <div className="border-2 rounded-3xl w-1/2 mb-8 shadow-lg cursor-pointer bg-gray-800" key={hostel.hostelid} onClick={() => { navigate(`./${hostel.hostelid}`) }}>
                            <div className='flex items-center justify-between py-1 px-6 my-2'>
                                <div className='flex items-end gap-2'>
                                    <p className="font-bold text-2xl text-gray-100">{hostel.name}</p>
                                    <p className='text-sm'>{hostel.overallRating ? <Rating name="read-only" value={hostel.overallRating} size="small" readOnly precision={0.1} /> : ''}</p>
                                </div>
                                <p className="text-gray-100 font-medium">{hostel.location}</p>
                            </div>
                            <div className='bg-white rounded-t-3xl rounded-b-2xl px-6 py-4'>
                                <p className="text-gray-700">₹{hostel.fees}/month | {hostel.totalCapacity} Students</p>
                                <p className='text-gray-900 pt-2 font-semibold text-lg'>Room Type: </p>
                                <div className='flex gap-12'>
                                    <div className='flex flex-col items-center'>
                                        <img className="w-6 mt-1" src={Man} />
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <div className='flex mt-1 text-sm'>
                                            <img className="w-6" src={Man} />
                                            <img className="w-6 -ml-1" src={Man} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <div className='flex mt-1'>
                                            <img className="w-6" src={Man} />
                                            <img className="w-6 -ml-1" src={Man} />
                                            <img className="w-6 -ml-1" src={Man} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div >
    )
}

export default HostelList