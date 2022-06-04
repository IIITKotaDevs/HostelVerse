import React from 'react'
import LoaderImage from "../assets/img/Loader.svg"

export default function Loader() {
    return (
        <div className="h-screen flex items-center">
            <img src={LoaderImage} alt="" className="mx-auto" />
        </div>
    )
}
