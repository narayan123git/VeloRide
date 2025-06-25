import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Riding = () => {

    const { rideId } = useParams();
    const [ride, setRide] = useState(null);

    useEffect(() => {
        if (rideId) {
            axios.get(`${import.meta.env.VITE_BASE_URL}/rides/${rideId}`)
                .then(res => setRide(res.data.ride))
                .catch(err => console.error('Failed to fetch ride:', err));
        }
    }, [rideId]);

    // console.log(ride)

    if (!ride) return <div>Loading ride details...</div>;

    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed top-2 right-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-4-line"></i>
            </Link>
            <div className='h-1/2'>
                <img
                    className='h-full w-full object-cover md:object-center'
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt=""
                />
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_496,w_881/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png" alt="VeloRide Vehicle" />
                    <div>
                        <h2 className='text-lg font-medium'>{ride.captain.fullname.firstname} {ride.captain.fullname.lastname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>{ride.captain.vehicle.vehicleType}</p>
                    </div>
                </div>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
                            <i className="ri-map-pin-user-line"></i>
                        </h2>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
                            <i className="ri-money-rupee-circle-line"></i>                        </h2>
                        <div>
                            <h3 className='text-lg font-medium'>{ride.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Price</p>
                        </div>
                    </div>
                </div>
                <button className='bg-green-400 text-white font-semibold mt-5 p-2 rounded-lg w-full'>Make a payment</button>
            </div>
        </div>
    )
}

export default Riding