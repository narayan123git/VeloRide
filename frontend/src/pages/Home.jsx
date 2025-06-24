import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'
import LookingForDrivers from '../components/LookingForDrivers'
import WaitingForDrivers from '../components/WaitingForDrivers'
import axios from 'axios'
import { SocketContext } from '../context/SocketContext'
const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmedVehicle = useRef(null)
  const panelRef = useRef(null)
  const route = useRef(null)
  const panelClose = useRef(null)
  const vehicleFoundRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [Driver, setDriver] = useState(false)
  const driverRef = useRef(null)
  const [focusedField, setFocusedField] = useState('');
  const [fares, setFares] = useState({}); // { car: {fare, distanceKm...}, bike: {...}, ... }
  const fareCache = useRef({});
  const [vehicleType, setVehicleType] = useState(false)
  const {sendMessage, onMessage} = useContext(SocketContext)
  const {user} = useContext(UserDataContext)

  useEffect(() => {
    if(!user) return
    sendMessage('join',{userId:user._id,userType:'user'})
  }, [user])
  


  const fetchFares = useCallback(async () => {
    const key = `${pickup}--${destination}`;
    if (fareCache.current[key]) {
      setFares(fareCache.current[key]);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.fare) {
        setFares(response.data.fare);
      }
      // console.log('Fetched fares 1:', response.data);
      console.log('Fetched fares:', fares);
      fareCache.current[key] = response.data;
    } catch (err) {
      console.error('Error fetching fares:', err);
    }
  }, [pickup, destination]);

  useEffect(() => {
    console.log("Updated fares:", fares);
  }, [fares]);



  const createRide = async (vehicleType) => {
    try {
      const token = localStorage.getItem('token'); // Assuming the latest token is here
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Ride created successfully:", res.data.ride);
      // return res.data.ride;
    } catch (error) {
      console.error("Error creating ride:", error?.response?.data || error.message);
      return null;
    }
  };

  const submitHandler = (e) => {
    e.preventdefault()
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: '24'
      })
      gsap.to(route.current, {
        display: 'block'
      })
      gsap.to(panelClose.current, {
        opacity: '1'
      })

    } else {
      gsap.to(panelRef.current, {
        height: '0',
        padding: '0'
      })
      gsap.to(route.current, {
        display: 'none'
      })
      gsap.to(panelClose.current, {
        opacity: '0'
      })
    }
  }, [panelOpen])

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0%)'
      })
    }
    else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanelOpen])

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        y: '0%',
        autoAlpha: 1,
        display: 'block',
        duration: 0.4,
        ease: 'power2.out'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        y: '100%',
        autoAlpha: 0,
        display: 'none',
        duration: 0.4,
        ease: 'power2.in'
      })
    }
  }, [vehicleFound])


  useGSAP(() => {
    if (confirmedRidePanel) {
      gsap.to(confirmedVehicle.current, {
        transform: 'translateY(0%)'
      })
    }
    else {
      gsap.to(confirmedVehicle.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmedRidePanel])

  useGSAP(() => {
    if (Driver) {
      gsap.to(driverRef.current, {
        transform: 'translateY(0%)'
      })
    }
    else {
      gsap.to(driverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [Driver])

  return (
    <>
      {(vehiclePanelOpen || confirmedRidePanel || Driver) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setVehiclePanelOpen(false)
            setConfirmedRidePanel(false)
            setDriver(false)
          }
          }
        />
      )}
      <div className='h-screen relative overflow-hidden'>
        <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="VeloRide Logo" />
        <div className='min-h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#2bda6399] to-[#b368d6] text-white'>
          <img
            className='h-screen w-screen object-cover md:object-center'
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
          />
        </div>
        <div className='flex flex-col justify-end absolute h-screen top-0 w-full'>
          <div className='h-[30%] bg-white p-5 relative'>
            <h5 ref={panelClose} onClick={() => {
              setPanelOpen(false)
            }
            }
              className='absolute top-2 right-6 text-[25px]'>
              <i className="ri-arrow-down-wide-fill"></i>
            </h5>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>
            <form onSubmit={(e) =>
              submitHandler(e)
            } className='flex flex-col'>
              <div ref={route} className='absolute left-12 top-18 flex flex-col items-center justify-center'>
                <div className='circle h-2 w-2 ml-0.5 bg-gray-900 rounded-full'></div>
                <div className='line h-16 w-1 ml-1 bg-[#df3a95ca] rounded-full'></div>
                <div className='circle h-2 w-2 ml-0.5 bg-gray-900 rounded-full'></div>
              </div>

              <input
                onFocus={() => {
                  setPanelOpen(true)
                  setFocusedField('pickup');
                }}
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value)
                  setFocusedField('pickup');
                }}
                className='bg-[#eee] mt-3 px-10 py-2 m-2 w-full text-base rounded-lg'
                type="text"
                placeholder='Enter your pickup location'
              />
              <input
                onFocus={() => {
                  setPanelOpen(true)
                  setFocusedField('destination');
                }}
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value)
                  setFocusedField('destination');
                }}
                className='bg-[#eee] px-10 py-2 m-2 w-full text-base rounded-lg'
                type="text"
                placeholder='Enter your destination'
              />
            </form>
          </div>
          <div ref={panelRef} className='h-0 bg-white'>
            <LocationSearchPanel
              fetchFares={fetchFares}
              setPanelOpen={setPanelOpen}
              setVehiclePanelOpen={setVehiclePanelOpen}
              pickup={pickup}
              setPickup={setPickup}
              destination={destination}
              setDestination={setDestination}
              focusedField={focusedField}
            />
          </div>
          <div
            ref={vehiclePanelRef}
            className='fixed w-full z-40 bg-white bottom-0 px-3 py-8 pt-12'
          >
            <VehiclePanel fares={fares} selectVehicle={setVehicleType} setVehiclePanelOpen={setVehiclePanelOpen} setConfirmedRidePanel={setConfirmedRidePanel} />
          </div>
          <div
            ref={confirmedVehicle}
            className='translate-y-full fixed w-full z-40 bg-white bottom-0 px-3 py-6 pt-12'
          >
            <ConfirmedRide
              pickup={pickup}
              destination={destination}
              createRide={createRide}
              fare={fares[vehicleType]?.fare}
              vehicleType={vehicleType}
              setVehicleFound={setVehicleFound}
              setConfirmedRidePanel={setConfirmedRidePanel}
            />
          </div>
          <div
            ref={vehicleFoundRef}
            className='translate-y-full fixed w-full z-40 bg-white bottom-0 px-3 py-6 pt-12'
          >
            <LookingForDrivers setVehicleFound={setVehicleFound} />
          </div>
          <div
            ref={driverRef}
            className='fixed w-full z-40 bg-white bottom-0 px-3 py-6 pt-12'
          >
            <WaitingForDrivers setDriver={setDriver} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
