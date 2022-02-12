import axios from 'axios'
import React, { useState, useEffect } from 'react'
import baseurl from "../config"

export default function studentList() {
    const [students, setStudents] = useState([]);
    const getStudentsList = async () => {
        const students = await axios.get(`${baseurl}/warden/studentList`)
        setStudents(students.data)
    }

    useEffect(() => {
        getStudentsList()
    }, [])

    const removeStudent = async () => axios.post(`${baseurl}/warden/removeStudent`,
        {
            studentid: localStorage.getItem('id'),
        },
        {
            headers: {
                Authorization: localStorage.getItem('jwtToken') ? `Bearer ${localStorage.getItem('jwtToken')}` : "",
                "Content-type": "application/json",
            }
        }).then(() => {
            getStudentsList()
        })

    return (
        <>
            <p className='font-bold text-3xl text-center mt-12 mb-8'>Student List</p>
            <div className='flex flex-col gap-4'>
                {students.map((student, index) => {
                    return (
                        <div className='flex justify-between items-center mx-32 px-10 py-4 border border-gray-200 rounded-lg'>
                            <div>
                                <p className='text-2xl font-semibold'>{student.profile.name}</p>
                                {student.roomid && student.hostelid ? <p>{student?.roomid} | {student?.hostelid}</p> : <p>No Room/Hostel Assigned</p>}
                                <p className='text-red-500 text-sm cursor-pointer font-medium'>Remove Student</p>
                            </div>
                            <img src={student.profile.picture} alt="" className='w-20 rounded-full' onClick={removeStudent} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}
