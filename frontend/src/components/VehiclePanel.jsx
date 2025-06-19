import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div >
          <h2 className='text-2xl font-semibold mb-5'>Choose a vehicle</h2>
          <div onClick={()=>{
            props.setConfirmedRidePanel(true)
            props.setVehiclePanelOpen(false)
          }} className='flex active:border-2 active:border-black bg-gray-100 rounded-xl w-full p-3 items-center justify-between'>
            <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_496,w_881/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png" alt="VeloRide Vehicle" />
            <div className='md:-ml-20 w-1/2'>
              <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-2-fill">4</i></span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
            </div>
            <h2 className='font-semibold text-lg'>₹193.20</h2>
          </div>
          <div onClick={()=>{
            props.setConfirmedRidePanel(true)
            props.setVehiclePanelOpen(false)
          }}
          className='flex mb-2 active:border-2 active:border-black bg-gray-100 rounded-xl w-full p-3 items-center justify-between'>
            <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png" alt="VeloRide Moto" />
            <div className='md:-ml-20 w-1/2'>
              <h4 className='font-medium text-base'>Moto <span><i className="ri-user-2-fill">1</i></span></h4>
              <h5 className='font-medium text-sm'>3 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable motorcycle ride, compact rides</p>
            </div>
            <h2 className='font-semibold text-lg'>₹65.17</h2>
          </div>
          <div onClick={()=>{
            props.setConfirmedRidePanel(true)
            props.setVehiclePanelOpen(false)
          }}
          className='flex mb-2 active:border-2 active:border-black bg-gray-100 rounded-xl w-full p-3 items-center justify-between'>
            <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="VeloRide Auto" />
            <div className='md:-ml-20 w-1/2'>
              <h4 className='font-medium text-base'>Auto <span><i className="ri-user-2-fill">3</i></span></h4>
              <h5 className='font-medium text-sm'>4 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
            </div>
            <h2 className='font-semibold text-lg'>₹193.20</h2>
          </div>
          <div onClick={()=>{
            props.setConfirmedRidePanel(true)
            props.setVehiclePanelOpen(false)
          }}
          className='flex mb-2 active:border-2 active:border-black bg-gray-100 rounded-xl w-full p-3 items-center justify-between'>
            <img className='h-12' src="https://w7.pngwing.com/pngs/253/459/png-transparent-yellow-taxi-art-taxi-amritsar-careem-bus-uber-yellow-car-compact-car-other-driving-thumbnail.png" alt="VeloRide Taxi" />
            <div className='md:-ml-20 w-1/2'>
              <h4 className='font-medium text-base'>Taxi <span><i className="ri-user-2-fill">5</i></span></h4>
              <h5 className='font-medium text-sm'>4 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable taxi, compact rides</p>
            </div>
            <h2 className='font-semibold text-lg'>₹193.20</h2>
          </div>
        </div>
  )
}

export default VehiclePanel