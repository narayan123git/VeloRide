import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConRidePopUp from '../components/ConRidePopUp'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainHome = () => {
  const { captain, loading } = useContext(CaptainDataContext);
  const [RidePopupPanel, setRidePopupPanel] = useState(false)
  const [ConRidePopupPanel, setConRidePopupPanel] = useState(false)
  const conridepopRef = useRef(null)
  const ridepopRef = useRef(null)
  const [pendingRide, setPendingRide] = useState(null)
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });
  // Replace with actual values from auth/user context
  const captainId = "your_captain_id" // get from auth/user context
  const captainLocation = { lat: 22.5726, lng: 88.3639 } // get from context or state (example: Kolkata)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        (err) => {
          // fallback to captain.location from context if denied
          if (captain.location && captain.location.lat && captain.location.lng) {
            setCurrentLocation({
              lat: captain.location.lat,
              lng: captain.location.lng
            });
          }
        }
      );
    } else if (captain.location && captain.location.lat && captain.location.lng) {
      setCurrentLocation({
        lat: captain.location.lat,
        lng: captain.location.lng
      });
    }
  }, [captain.location]);

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  useEffect(() => {
    if (loading) return; // Wait until captain profile is loaded
    console.log('captain._id:', captain._id);
    console.log('currentLocation.lat:', currentLocation.lat);
    console.log('currentLocation.lng:', currentLocation.lng);
    if (
      !captain._id ||
      !currentLocation.lat ||
      !currentLocation.lng
    ) {
      console.log('Captain or location not available');
      return
    };

    console.log('Emitting captain-online', captain._id, currentLocation); // <-- Add this
    const socket = io(import.meta.env.VITE_BASE_URL.replace('/api', ''));
    socket.emit('captain-online', {
      captainId: captain._id,
      lat: currentLocation.lat,
      lng: currentLocation.lng
    });
    socket.on('ride-request', (ride) => {
      console.log('Received ride-request event:', ride); // <-- Add this
      if (ride.pickup && ride.pickup.lat && ride.pickup.lng) {
        const dist = getDistanceFromLatLonInKm(
          ride.pickup.lat,
          ride.pickup.lng,
          currentLocation.lat,
          currentLocation.lng
        );
        console.log('Distance to pickup:', dist); // <-- Add this
        if (dist <= 250) {
          setPendingRide(ride);
          setRidePopupPanel(true);
        }
      }
    });
    return () => socket.disconnect();
  }, [captain._id, currentLocation.lat, currentLocation.lng]);

  useGSAP(() => {
    if (RidePopupPanel) {
      gsap.to(ridepopRef.current, {
        transform: 'translateY(0%)'
      })
    }
    else {
      gsap.to(ridepopRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [RidePopupPanel])

  useGSAP(() => {
    if (ConRidePopupPanel) {
      gsap.to(conridepopRef.current, {
        transform: 'translateY(0%)'
      })
    }
    else {
      gsap.to(conridepopRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ConRidePopupPanel])

  if (loading) return <div>Loading captain profile...</div>;

  return (
    <>
      {(RidePopupPanel || ConRidePopupPanel) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setRidePopupPanel(false)
            setConRidePopupPanel(false)
          }}
        />
      )}
      <div className='h-screen'>
        <div className='fixed p-6 top-0 w-screen flex items-center justify-between'>
          <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="VeloRide Logo" />
          <Link to='/captain-home' className='fixed top-2 right-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
          </Link>
        </div>
        <div className='h-[70%]'>
          <img
            className='h-full w-full object-cover md:object-center'
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
          />
        </div>
        <div className='h-[30%] p-6'>
          <CaptainDetails />
        </div>
        <div ref={ridepopRef}
          className='translate-y-full fixed w-full z-40 bg-white bottom-0 px-3 py-8 pt-12'
        >
          <RidePopUp
            ride={pendingRide}
            setRidePopupPanel={setRidePopupPanel}
            setConRidePopupPanel={setConRidePopupPanel}
            captainId={captain._id}
          />
        </div>
        <div ref={conridepopRef}
          className='translate-y-full fixed w-full h-screen z-40 bg-white bottom-0 px-3 py-8 pt-12'
        >
          <ConRidePopUp
            ride={pendingRide}
            setRidePopupPanel={setRidePopupPanel}
            setConRidePopupPanel={setConRidePopupPanel}
          />
        </div>
      </div>
    </>
  )
}

export default CaptainHome