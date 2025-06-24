import React from 'react'
import 'remixicon/fonts/remixicon.css'

const ConfirmedRide = ({
  pickup,
  destination,
  fare,
  createRide,
  vehicleType,
  setVehicleFound,
  setConfirmedRidePanel
}) => {
  return (
    <div>
      <h3 className='text-2xl font-semibold mb-5'>Confirm your ride</h3>
      <div className='flex gap-2 w-full justify-between items-center flex-col'>
        <img
          className='h-30'
          src={`https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_496,w_881/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png`}
          alt="VeloRide Vehicle"
        />

        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
            <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <div>
              <h3 className='text-lg font-medium'>{pickup?.split(',')[0]}</h3>
              <p className='text-sm -mt-1 text-gray-600'>{pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
            <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
              <i className="ri-map-pin-user-line"></i>
            </h2>
            <div>
              <h3 className='text-lg font-medium'>{destination?.split(',')[0]}</h3>
              <p className='text-sm -mt-1 text-gray-600'>{destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
              <i className="ri-money-rupee-circle-line"></i>
            </h2>
            <div>
              <h3 className='text-lg font-medium'>₹{fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Price ({vehicleType})</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setVehicleFound(true);
            setConfirmedRidePanel(false);
            createRide(vehicleType);
          }}
          className='bg-green-400 text-white font-semibold mt-5 p-2 rounded-lg w-full'
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default ConfirmedRide
