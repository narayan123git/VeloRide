import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const FinishRide = ({ ride }) => {

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    // Fallbacks for missing data
    const userName = (ride?.user?.fullname?.firstname + ' ' + ride?.user?.fullname?.lastname) || 'User';
    const [distance, setDistance] = useState('Calculating...');
    const pickup = ride?.pickup || 'Pickup Address';
    const destination = ride?.destination || 'Destination Address';
    const fare = ride?.fare ? `₹${ride.fare}` : 'N/A';

    useEffect(() => {
        async function geocode(address) {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
            const res = await fetch(url);
            const data = await res.json();
            if (data && data.length > 0) {
                return {
                    lat: parseFloat(data[0].lat),
                    lon: parseFloat(data[0].lon)
                };
            }
            return null;
        }
        async function calculateDistance() {
            if (!pickup || !destination) {
                setDistance('N/A');
                return;
            }
            try {
                const [pickupCoords, destCoords] = await Promise.all([
                    geocode(pickup),
                    geocode(destination)
                ]);
                if (pickupCoords && destCoords) {
                    const dist = getDistanceFromLatLonInKm(
                        pickupCoords.lat,
                        pickupCoords.lon,
                        destCoords.lat,
                        destCoords.lon
                    );
                    setDistance(dist.toFixed(2) + ' KM');
                } else {
                    setDistance('N/A');
                }
            } catch {
                setDistance('N/A');
            }
        }
        calculateDistance();
    }, [pickup, destination]);

    return (
        <div>
            <h3 className='text-2xl font-semibold mb-5'>Finish this ride</h3>
            <div className='flex items-center justify-between border-2 border-yellow-400 rounded-lg p-3'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 rounded-full object-cover' src={ride?.user?.avatar || "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"} alt="" />
                    <h2 className='text-lg font-medium'>{userName}</h2>
                </div>
                <h5 className='text-lg font-semibold'>{distance}</h5>
            </div>
            <div className='flex gap-2 w-full justify-between items-center flex-col'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <div className="w-full text-left">
                            <h3 className='text-lg font-medium'>{pickup}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
                            <i className="ri-map-pin-user-line"></i>
                        </h2>
                        <div className="w-full text-left">
                            <h3 className='text-lg font-medium'>{destination}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
                            <i className="ri-money-rupee-circle-line"></i>
                        </h2>
                        <div>
                            <h3 className='text-lg font-medium'>{fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Price</p>
                        </div>
                    </div>
                </div>
                <Link to='/captain-home' className='bg-green-400 text-white font-semibold mt-5 p-3 rounded-lg w-auto'>Finish ride</Link>
                <p className='text-red-500 text-xm mt-10'>Click on "Finish ride", if you have got the payment</p>
            </div>
        </div>
    )
}

export default FinishRide