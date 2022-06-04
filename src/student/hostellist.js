import React, { useEffect, useState } from 'react'
import { Menu } from '@headlessui/react'
import Slider from "@material-ui/core/Slider";
import { useNavigate } from 'react-router-dom';
import { useHostelList } from '../queries/hooks';
import Man from '../assets/img/man.svg'
import Rating from '@mui/material/Rating';
import Hostel from '../assets/img/hostel.jpg';
import { updateLow, updateHigh } from './slices/modalSlice'
import { useDispatch, useSelector } from 'react-redux';

function HostelList() {
    const [hostelData, setHostelData] = useState([])
    const navigate = useNavigate()
    const low = useSelector(state => state.modal.low)
    const high = useSelector(state => state.modal.high)
    const dispatch = useDispatch();

    const hostelList = useHostelList({
        low: low,
        high: high,
    })

    useEffect(() => {
        setHostelData(hostelList.data)
    }, [hostelList.isSuccess === true])

    useEffect(() => {
        hostelList.refetch()
    }, [low, high])

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
                                    value={[low, high]}
                                    onChange={(e, v) => {
                                        dispatch(updateLow(v[0]))
                                        dispatch(updateHigh(v[1]))
                                    }}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    marks={[{ value: 0, label: '0' }, { value: 5000, label: '5000' }, { value: 10000, label: '10000' }, { value: 15000, label: '15000' }, { value: 20000, label: '20000' }, { value: 25000, label: '25000' }, { value: 30000, label: '30000' }]}
                                    min={0}
                                    max={30000}
                                />
                            </div>
                        </div>
                    )}
                </Menu >
            </div >

            <div className="flex flex-wrap gap-8 justify-center items-center pt-8">
                {hostelData?.data && hostelData.data.map(hostel => {
                    return (
                        <div className="border-1 rounded-2xl overflow-hidden border-gray-100 w-2/5 shadow-xl cursor-pointer" key={hostel.hostelid} onClick={() => { navigate(`./${hostel.hostelid}`) }}>
                            <div style={{ backgroundImage: `url(${Hostel})` }} className="bg-no-repeat bg-center h-32"></div>
                            <div className='bg-gray-800 rounded-2xl z-10 overflow-hidden -mt-10'>
                                <div className='flex items-center justify-between py-3 px-6'>
                                    <div className='flex items-end gap-2'>
                                        <p className="font-bold text-2xl text-gray-100">{hostel.name}</p>
                                        <p className='text-sm'>{hostel.overallRating ? <Rating name="read-only" value={hostel.overallRating} size="small" readOnly precision={0.1} /> : ''}</p>
                                    </div>
                                    <p className="text-gray-100 font-medium">{hostel.location}</p>
                                </div>
                                <div className='px-6 py-4 bg-white rounded-2xl overflow-hidden'>
                                    <div className='flex justify-between items-end'>
                                        <p className="text-gray-700"><span className='font-bold text-xl'>₹{hostel.fees}</span>/month</p>
                                        <div className='flex gap-0.5 text-gray-700'>
                                            <p className='text-sm'> Capacity: <span className='font-medium'>{hostel.totalCapacity}</span></p>
                                            <img className="w-3" src={Man} />
                                        </div>
                                    </div>
                                    <p className='text-gray-900 pt-2 font-semibold'>Room Type: </p>
                                    <div className='flex gap-12 mt-1'>
                                        {hostel.singleRooms > 0 ? <div className='flex flex-col items-center'>
                                            <img className="w-6 mt-1" src={Man} />
                                        </div> : null}
                                        {hostel.doubleRooms > 0 ? <div className='flex mt-1 text-sm'>
                                            <img className="w-6" src={Man} />
                                            <img className="w-6 -ml-1" src={Man} />
                                        </div> : null}
                                        {hostel.tripeRooms > 0 ? <div className='flex mt-1'>
                                            <img className="w-6" src={Man} />
                                            <img className="w-6 -ml-1" src={Man} />
                                            <img className="w-6 -ml-1" src={Man} />
                                        </div> : null}
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