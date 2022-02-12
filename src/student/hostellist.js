import React, { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Slider } from "@material-ui/core";
import { data } from 'autoprefixer';

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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

function HostelList() {
    const [val, setVal] = useState([5000, 15000])
    const updateChange = (e, data) => {
        setVal(data)
    }
  return (
    <div className="grid grid-cols-12 p-16">
        <div className="col-span-2">
            <Menu>
                {({ open }) => (
                    <>
                    <Menu.Button className="hover:text-blue-500 my-2 rounded-md border-gray-400 border-2 p-2 w-28">
                        Fees 
                        <FontAwesomeIcon icon="fa-thin fa-circle-down" />
                    </Menu.Button>
                    {open && (
                        <div>
                        <Menu.Items static>
                            <Menu.Item>
                                {({ active }) => (
                                    <h1
                                    className={`${active && 'bg-blue-500 text-white'}`}
                                    href="/account-settings"
                                    >
                                    Account settings
                                    </h1>
                                )}
                            </Menu.Item>
                            <Menu.Item style={{width:300, margin:30}}>
                                {({ active }) => (
                                    <Slider
                                    min={0}
                                    max={20000}
                                    defaultValue={[5000, 15000]}
                                    getAriaLabel={() => 'Temperature range'}
                                    value={val}
                                    onChange={updateChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={"hemlo"}
                                  />
                                )}
                            </Menu.Item>
                            <Menu.Item disabled>
                                <span className="opacity-75">Invite a friend (coming soon!)</span>
                            </Menu.Item>
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
                    <Menu.Button className="hover:text-blue-500 my-2 rounded-md border-gray-400 border-2 p-2 w-28">Location</Menu.Button>
                    {open && (
                        <div>
                        <Menu.Items static>
                            {/* <Menu.Item>
                                {({ active }) => ( */}
                                    <form>
                                        <label>
                                        <textarea className="pl-2" type="text" name="name" placeholder='Enter location' onChange={console.log("Changed")} />
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
                    {open && (
                        <div>
                        <Menu.Items static>
                            <Menu.Item>
                                {({ active }) => (
                                    <h1
                                    className={`${active && 'bg-blue-500 text-white'}`}
                                    href="/account-settings"
                                    >
                                    Account settings
                                    </h1>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <h1
                                    className={`${active && 'bg-blue-500 text-white'}`}
                                    href="/account-settings"
                                    >
                                    Documentation
                                    </h1>
                                )}
                            </Menu.Item>
                            <Menu.Item disabled>
                                <span className="opacity-75">Invite a friend (coming soon!)</span>
                            </Menu.Item>
                        </Menu.Items>
                        </div>
                    )}
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