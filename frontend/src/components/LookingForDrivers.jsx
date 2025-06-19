import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const LookingForDrivers = ({ setVehicleFound }) => {
    const [showOptions, setShowOptions] = useState(false)
    const [waitKey, setWaitKey] = useState(0)

    useEffect(() => {
        setShowOptions(false)
        const timer = setTimeout(() => setShowOptions(true), 8000)
        return () => clearTimeout(timer)
    }, [waitKey])

    const n=useNavigate()

    const handleExit = () => {
        setVehicleFound(false)
        n('/home')
    }

    return (
        <div className="flex flex-col items-center justify-center  bg-gradient-to-r from-[#44d0b6] to-[#c46bec] p-8">
            <h3 className="text-3xl font-bold mb-4 text-center text-white drop-shadow-lg">
                Looking for a driver
                <span className="inline-block ml-2">
                    <span className="inline-block animate-bounce [animation-delay:0s] text-2xl">.</span>
                    <span className="inline-block animate-bounce [animation-delay:0.2s] text-2xl">.</span>
                    <span className="inline-block animate-bounce [animation-delay:0.4s] text-2xl">.</span>
                </span>
            </h3>
            <div className="flex flex-col items-center">
                <div className="mb-6">
                    <img
                        className="h-40 animate-pulse drop-shadow-xl"
                        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_496,w_881/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
                        alt="VeloRide Vehicle"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[#108b3fcb] mr-3"></div>
                    <span className="text-lg text-white font-medium">Searching nearby drivers...</span>
                </div>
                {showOptions && (
                    <div className="mt-8 flex flex-col items-center gap-3">
                        <span className="text-white text-base mb-2">Still looking for a driver...</span>
                        <button
                            className="bg-[#108b3fcb] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#0e6e34] transition"
                            onClick={() => setWaitKey(prev => prev + 1)}
                        >
                            Wait More
                        </button>
                        <button
                            className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                            onClick={handleExit}
                        >
                            Exit
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LookingForDrivers