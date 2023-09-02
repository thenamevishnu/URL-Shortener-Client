import React from 'react'
import "./Loader.css"

function Loader({center}) {
    return (
        <div className={center ? `h-screen loader flex  justify-center items-center` : `loader flex justify-center items-center`}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
    )
}

export default Loader
