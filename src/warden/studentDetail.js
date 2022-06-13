import React from 'react'
import { useParams } from 'react-router-dom';
import person from '../assets/img/person.jpg'
import { useStudentDetailsWarden } from '../queries/hooks'
import { localStorageKey } from '../utils/localStorageKey';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function studentDetail() {
    const params = useParams();
    const studentDetails = useStudentDetailsWarden({
        studentid: params.id,
        wardenid: localStorage.getItem(localStorageKey.id),
    });

    console.log(studentDetails);

    return (
        <div className='flex h-screen justify-center bg-gray-150 items-center'>
            <div className='flex justify-center'>
                <div className='z-10'>
                    <img src={person} alt="" className='w-96 rounded-xl shadow-2xl' />
                    <p className='text-center text-xl text-gray-800 font-bold'>{studentDetails?.data?.data?.profile?.studentid}</p>
                </div>
                <div className='pt-10 bg-white mt-40 w-1/2 -ml-20 pl-36 pr-20 my-auto rounded-xl shadow-2xl'>
                    <div className='font-fredoka font-extrabold text-transparent text-6xl  '>
                        <p className='bg-clip-text bg-gradient-to-r from-yellow-600 to-primary -ml-12 -mt-32'>{studentDetails?.data?.data?.profile?.name.split(' ')[0]}</p>
                        <p className='bg-clip-text bg-gradient-to-r from-yellow-600 to-primary ml-4 mt-4'>{studentDetails?.data?.data?.profile?.name.split(' ')[1]}</p>
                        <p className='bg-clip-text bg-gradient-to-r from-yellow-600 to-primary ml-20 mt-4'>{studentDetails?.data?.data?.profile?.name.split(' ')[2]}</p>
                        <p className='bg-clip-text bg-gradient-to-r from-yellow-600 to-primary ml-36 mt-4'>{studentDetails?.data?.data?.profile?.name.split(' ')[3]}</p>
                    </div>
                    <div>
                        <p className={`uppercase text-xl text-primary font-anton ${studentDetails?.data?.data?.profile?.name?.split(' ').length > 1 ? 'mt-8' : 'mt-12'}`}>A b o u t</p>
                        <p className='mt-1 text-justify text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam similique sed delectus mollitia, voluptate earum, quae expedita alias maiores nostrum odit reprehenderit laboriosam, minima laudantium nihil cum molestias perferendis illo.</p>
                    </div>
                    <div className='pt-8'>
                        <p className='text-xl text-primary font-anton uppercase'>A d d r e s s</p>
                        <div className='flex justify-start gap-20 pt-2'>
                            <p className='font-semibold'> <FontAwesomeIcon icon={solid('building')} className='text-gray-700' /> {studentDetails?.data?.data?.hostelid}</p>
                            <p className='font-semibold'> <FontAwesomeIcon icon={solid('home')} className='text-gray-700' /> {studentDetails?.data?.data?.roomid}</p>
                        </div>
                    </div>
                    <div className='py-8'>
                        <p className='text-xl text-primary font-anton uppercase'>S o c i a l</p>
                        <div className="w-full items-center pt-2 flex gap-8 text-gray-700">
                            <FontAwesomeIcon className="cursor-pointer text-green-500" icon={solid('phone')} />
                            <FontAwesomeIcon className="cursor-pointer text-orange-700" icon={solid('envelope')} />
                            <FontAwesomeIcon className="cursor-pointer text-green-700" icon={solid('message')} />
                            {localStorage.getItem(localStorageKey.role === 'admin') ? <FontAwesomeIcon className="cursor-pointer text-red-500" icon={solid('ban')} /> : null}
                            <FontAwesomeIcon className="cursor-pointer text-pink-500" icon={brands("instagram")} />
                            <FontAwesomeIcon className="cursor-pointer text-blue-700" icon={brands('linkedin-in')} />
                            <FontAwesomeIcon className="cursor-pointer" icon={brands('github')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
