import React from 'react';

const RideCard = ({ ride, onAccept, onIgnore }) => {
  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <h4 className="font-semibold text-lg mb-2">New Ride</h4>

      <div className="mb-2">
        <p><strong>Pickup:</strong> {ride.pickup}</p>
        <p><strong>Destination:</strong> {ride.destination}</p>
        <p><strong>Fare:</strong> ₹{ride.fare}</p>
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={onAccept} className="bg-green-500 text-white px-4 py-2 rounded">Accept</button>
        <button onClick={onIgnore} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Ignore</button>
      </div>
    </div>
  );
};

export default RideCard;
