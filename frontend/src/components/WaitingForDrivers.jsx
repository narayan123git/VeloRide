import React from 'react'

const WaitingForDrivers = ({ setDriver }) => {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_496,w_881/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png" alt="" />
                <div>
                    <h2 className='text-lg font-medium'>Narayan</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>JAJSI 728</h4>
                    <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                </div>
            </div>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                    <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
                        <i className="ri-map-pin-fill"></i>
                    </h2>
                    <div>
                        <h3 className='text-lg font-medium'>562/11/a</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Rampur, Coochbehar, West bengal</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                    <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
                        <i className="ri-map-pin-user-line"></i>
                    </h2>
                    <div>
                        <h3 className='text-lg font-medium'>562/11/a</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Rampur, Coochbehar, West bengal</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
                        <i className="ri-money-rupee-circle-line"></i>                        </h2>
                    <div>
                        <h3 className='text-lg font-medium'>₹193.20</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash Price</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingForDrivers