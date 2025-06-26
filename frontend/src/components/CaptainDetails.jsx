import React from 'react'

const CaptainDetails = ({ captain }) => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-3'>
          <img className='h-10 w-10 rounded-full object-cover' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="" />
          <h4 className='text-lg font-medium'>{captain?.fullname?.firstname} {captain?.fullname?.lastname}
          </h4>
        </div>
        <div>
          <h4 className='text-xl font-semibold'>₹{captain?.vehicle?.earnings ?? 0}</h4>
          <p className='text-sm text-gray-600'>Earned</p>
        </div>
      </div>
      <div className='flex p-3 mt-6 bg-gray-200 rounded-xl justify-center gap-8 items-start'>
        <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-time-fill"></i>
          <h5 className='text-lg font-medium'>{captain?.vehicle?.hoursOnline ?? 0}</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'><i className="text-3xl mb-2 font-thin ri-pin-distance-fill"></i>
          <h5 className='text-lg font-medium'>{captain?.vehicle?.distance ?? 0} km</h5>
          <p className='text-sm text-gray-600'>Distance Covered</p>
        </div>
        <div className='text-center'><i className="text-3xl mb-2 font-thin ri-booklet-fill"></i>
          <h5 className='text-lg font-medium'>{captain?.vehicle?.totalRides ?? 0}</h5>
          <p className='text-sm text-gray-600'>Total Rides</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails