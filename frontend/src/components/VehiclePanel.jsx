 import React from 'react'

const VehiclePanel = ({ fares, ...props }) => {
  const vehicleList = [
    {
      type: 'car',
      label: 'VeloGo',
      image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_496,w_881/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png',
      capacity: 4,
      time: '2 mins away'
    },
    {
      type: 'bike',
      label: 'Moto',
      image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png',
      capacity: 1,
      time: '3 mins away'
    },
    {
      type: 'auto',
      label: 'Auto',
      image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
      capacity: 3,
      time: '4 mins away'
    },
    {
      type: 'taxi',
      label: 'Taxi',
      image: 'https://w7.pngwing.com/pngs/253/459/png-transparent-yellow-taxi-art-taxi-amritsar-careem-bus-uber-yellow-car-compact-car-other-driving-thumbnail.png',
      capacity: 5,
      time: '4 mins away'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Choose a vehicle</h2>
      {vehicleList.map((v) => (
        <div
          key={v.type}
          onClick={() => {
            props.setConfirmedRidePanel(true);
            props.selectVehicle(v.type);
            props.setVehiclePanelOpen(false);
          }}
          className="flex mb-2 active:border-2 active:border-black bg-gray-100 rounded-xl w-full p-3 items-center justify-between"
        >
          <img className="h-12" src={v.image} alt={v.label} />
          <div className="md:-ml-20 w-1/2">
            <h4 className="font-medium text-base">
              {v.label}{' '}
              <span>
                <i className="ri-user-2-fill">{v.capacity}</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">{v.time}</h5>
            <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
          </div>
          <h2 className="font-semibold text-lg">
            ₹{fares?.[v.type]?.fare ?? '--'}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default VehiclePanel