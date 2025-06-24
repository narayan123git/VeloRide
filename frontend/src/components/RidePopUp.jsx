import React from 'react';
import axios from 'axios';

const RidePopUp = ({ setRidePopupPanel, setConRidePopupPanel, ride, captainId }) => {

  const handleAccept = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/accept`, {
        rideId: ride._id,
        captainId
      });
      setRidePopupPanel(false);
      setConRidePopupPanel(true);
    } catch (err) {
      alert('Failed to accept ride');
    }
  };

  return (
    <div>
      <h3 className='text-2xl font-semibold mb-5'>New ride available</h3>
      <div className='flex items-center justify-between bg-yellow-400 rounded-lg p-3'>
        <div className='flex items-center gap-3'>
          <img className='h-12 rounded-full object-cover' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="" />
          <h2 className='text-lg font-medium'>{ride?.userName || "User"}</h2>
        </div>
        <h5 className='text-lg font-semibold'>
          {ride?.distance ? `${ride.distance.toFixed(1)} KM` : '— KM'}
        </h5>
      </div>

      <div className='flex gap-2 w-full justify-between items-center flex-col'>
        <div className='w-full mt-5'>
          {/* Pickup */}
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
            <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <div>
              <h3 className='text-lg font-medium'>Pickup</h3>
              <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup || "N/A"}</p>
            </div>
          </div>

          {/* Destination */}
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
            <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
              <i className="ri-map-pin-user-line"></i>
            </h2>
            <div>
              <h3 className='text-lg font-medium'>Destination</h3>
              <p className='text-sm -mt-1 text-gray-600'>{ride?.destination || "N/A"}</p>
            </div>
          </div>

          {/* Fare */}
          <div className='flex items-center gap-5 p-3'>
            <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
              <i className="ri-money-rupee-circle-line"></i>
            </h2>
            <div>
              <h3 className='text-lg font-medium'>₹{ride?.fare || '0'}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Price</p>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between gap-3'>
          <button
            onClick={handleAccept}
            className='bg-green-400 text-white font-semibold mt-5 p-3 px-8 rounded-lg'>
            Accept
          </button>
          <button
            onClick={() => setRidePopupPanel(false)}
            className='bg-gray-300 text-gray-700 font-semibold mt-5 p-3 px-8 rounded-lg'>
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
