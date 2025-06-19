import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = (props) => {

  //sample array for location
  const locations = [
    "24B, Rampur, Coochbehar",
    "24B, Rampur, Coochbehar",
    "24B, Rampur, Coochbehar",
    "24B, Rampur, Coochbehar",
    "24B, Rampur, Coochbehar",
    "24B, Rampur, Coochbehar",
  ]
  return (
    <div className='flex flex-col gap-4 p-4 bg-[#bb7ecf9b] rounded-lg shadow-lg max-h-[70%] overflow-y-auto'>

      {
        locations.map((ln,key) => {
          return <div onClick={()=>{
            props.setVehiclePanelOpen(true)
            props.setPanelOpen(false)
          }} key={key}className='flex gap-4 items-center active:border-2 px-3 py-2 rounded-lg active:border-black justify-start'>
            <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className='font-medium'>{ln}</h4>
          </div>
        })
      }
      
    </div>
  )
}

export default LocationSearchPanel