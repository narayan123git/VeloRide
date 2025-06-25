import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLocation } from 'react-router-dom';

const CaptainRide = () => {

    const location = useLocation();
    const ride = location.state?.ride;
    const [finsihRidePanel, setFinsihRidePanel] = useState(false)
    const finishRideRef = useRef(null)
    useGSAP(() => {
        if (finsihRidePanel) {
            gsap.to(finishRideRef.current, {
                transform: 'translateY(0%)'
            })
        }
        else {
            gsap.to(finishRideRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finsihRidePanel])

    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 w-screen flex items-center justify-between'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="VeloRide Logo" />
                <Link to='/captain-home' className='fixed top-2 right-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>            </Link>
            </div>
            <div className='h-[80%]'>
                <img
                    className='h-full w-full object-cover md:object-center'
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt=""
                />
            </div>
            <div className='h-[20%] p-6 bg-yellow-400 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
                        <i className="ri-map-pin-user-line"></i>
                    </h2>
                    <h4 className='text-xl font-semibold'>4 mins away</h4>
                </div>
                <button
                    onClick={() => {
                        setFinsihRidePanel(true)
                    }}
                    className='bg-green-500 text-white-700 font-semibold py-3 rounded-lg px-6'>Complete Ride</button>
            </div>

            <div ref={finishRideRef}
                className='translate-y-full fixed h-screen w-full z-40 bg-white bottom-0 px-3 py-8 pt-12'
            >
                <FinishRide ride={ride} />
            </div>
        </div>
    )
}

export default CaptainRide