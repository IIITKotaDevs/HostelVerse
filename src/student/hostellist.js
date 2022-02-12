import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import Slider from "@material-ui/core/Slider";

const cards = [
    {
        name: "Hostel1",
        location: "Jaipur",
        seats: 30,
        rent: 10000,
        stars: 4.5,
        students: 30
    },
    {
        name: "Hostel2",
        location: "Jaipur",
        seats: 40,
        rent: 10000,
        stars: 4.5,
        students: 30
    },
]

function HostelList() {
    const [val, setVal] = useState([5000, 15000])
    const [seats, setSeats] = useState(20)
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
            <br />
            <Menu>
                {({ open }) => (
                    <>
                    <Menu.Button className="hover:text-blue-500 my-2 rounded-md border-gray-400 border-2 p-2 w-28">Location</Menu.Button>
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
                    <Menu.Button className="hover:text-blue-500 my-2 rounded-md border-gray-400 border-2 p-2 w-28">Seats Left</Menu.Button>
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
            {cards.map(card => {
                return(
                    <div className="text-center border-2 rounded-lg mx-8 shadow-lg h-40">
                        <h1 className="font-bold text-xl my-2">{card.name}</h1>
                        <h1 className="text-gray-500">{card.location} | ₹{card.rent}/month | {card.stars}⭐️ | {card.students} </h1>
                        <h1 className="text-lg font-bold mt-2">Seats Left: {card.seats}</h1>
                    </div>
                )
            })}
        </div>
        
    </div>
  )
}

export default HostelList