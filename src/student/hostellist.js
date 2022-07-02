import React, { useEffect, useState } from 'react'
import { Menu } from '@headlessui/react'
import Slider from "@material-ui/core/Slider";
import { useNavigate } from 'react-router-dom';
import { useHostelList } from '../queries/hooks';
import Man from '../assets/img/man.svg'
import Rating from '@mui/material/Rating';
import Hostel from '../assets/img/hostel.jpg';
import { updateName, updateLow, updateHigh } from './slices/modalSlice'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';

function HostelList() {
    const [hostelData, setHostelData] = useState([])
    const navigate = useNavigate()
    const name = useSelector(state => state.modal.name)
    const low = useSelector(state => state.modal.low)
    const high = useSelector(state => state.modal.high)
    const dispatch = useDispatch();

    const hostelList = useHostelList({
        low: 0,
        high: 100000,
    })

    useEffect(() => {
        setHostelData(hostelList.data?.data)
    }, [hostelList.isSuccess === true])

    const filter = (name) => {
        const filteredHostel = hostelList.data?.data
            .filter(hostel => {
                return hostel.fees >= (low === '' ? 0 : low) && hostel.fees <= (high === '' ? 100000 : high) && (name?.length >= 0 ? hostel.name.toLowerCase().includes(name.toLowerCase()) : true)
            })
        setHostelData(filteredHostel)
    }

    return (
        <>
            <div className="pt-16 pb-8 divide-y-4 divide-blue-200 bg-blue-50 min-h-screen">
                <div className="pb-4">
                    <p className='text-3xl font-bold text-gray-900 text-center mb-4'>Hostel List</p>
                    <div className='flex flex-col items-center'>
                        <div className='bg-white rounded-lg overflow-hidden shadow-md w-1/3 mx-auto'>
                            <TextField
                                inputProps={{ style: { fontSize: 14, backgroundColor: "white" } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                                id="filled"
                                label="Search by Name"
                                variant="filled"
                                value={name}
                                onChange={(e) => {
                                    dispatch(updateName(e.target.value))
                                    filter(e.target.value)
                                }}
                                size='small'
                                className="w-full bg-white"
                            />
                        </div>
                        <div className='mt-2 flex justify-between w-1/3'>
                            <div className='bg-white flex gap-2 items-center shadow-md rounded-md px-2 pt-1'>
                                <TextField
                                    id="input-with-icon-low"
                                    value={low}
                                    inputProps={{ style: { fontSize: 14, backgroundColor: "white" } }}
                                    onChange={(e) => { dispatch(updateLow(e.target.value)) }}
                                    label="Low"
                                    size='small'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FontAwesomeIcon icon={solid('indian-rupee-sign')} className='text-gray-700' />
                                            </InputAdornment>
                                        ),
                                        style: { fontSize: 14, backgroundColor: "white" }
                                    }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    variant="standard"
                                />
                            </div>
                            <div className='bg-white flex gap-2 items-center shadow-md rounded-md px-2 pt-1'>
                                <TextField
                                    id="input-with-icon-high"
                                    value={high}
                                    inputProps={{ style: { fontSize: 14, backgroundColor: "white" } }}
                                    onChange={(e) => { dispatch(updateHigh(e.target.value)) }}
                                    label="High"
                                    size='small'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FontAwesomeIcon icon={solid('indian-rupee-sign')} className='text-gray-700' />
                                            </InputAdornment>
                                        ),
                                        style: { fontSize: 14, backgroundColor: "white" }
                                    }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    variant="standard"
                                />
                            </div>
                            <button type="submit" className='px-8 bg-blue-700 text-white font-medium rounded-lg' onClick={() => filter()}>Filter</button>
                        </div>
                    </div>
                </div >


                {hostelData ?
                    <div className="flex flex-wrap gap-8 justify-center items-center pt-8">
                        {hostelData?.length > 0 ? hostelData.map(hostel => {
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
                        }) : <div className='flex justify-center items-center'>
                            <p className='text-gray-900 font-semibold italic'>No hostel found with the given filters. Try changing filters!</p>
                        </div>}
                    </div>
                    : <Loader />}
            </div >
        </>
    )
}

export default HostelList