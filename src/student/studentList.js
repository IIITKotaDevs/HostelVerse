import axios from 'axios'
import React, { useState } from 'react'
import baseurl from "../config"

export default function studentList() {
    const [students, setStudents] = useState([]);
    const getStudentsList = async () => {
        const students = await axios.get(`${baseurl}/warden/studentList`)
        setStudents(students.data)
    }

    console.log(students)
    return (
        <div>
            Hello
        </div>
    )
}
