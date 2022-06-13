import React from 'react'
import LoaderImage from "../assets/img/Loader.svg"

export default function Loader() {
    return (
        <div className="flex items-center py-4">
            <img src={LoaderImage} alt="" className="mx-auto" />
        </div>
    )
}
