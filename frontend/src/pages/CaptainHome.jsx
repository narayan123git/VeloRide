import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConRidePopUp from '../components/ConRidePopUp'
import { CaptainDataContext } from '../context/CaptainContext'
import RideCard from '../components/RichCard'; // Create a new component for each ride card
import axios from 'axios'
import captainSocket from '../socket/captainSocket'

const CaptainHome = () => {
  const socket = captainSocket
  const { captain, loading } = useContext(CaptainDataContext);
  const [RidePopupPanel, setRidePopupPanel] = useState(false)
  const [ConRidePopupPanel, setConRidePopupPanel] = useState(false)
  const conridepopRef = useRef(null)
  const ridepopRef = useRef(null)
  const [pendingRide, setPendingRide] = useState(null)
  const [rideQueue, setRideQueue] = useState([]);
  const [activeRide, setActiveRide] = useState(null);


  useEffect(() => {
    if (!socket || !captain?._id) return;

    const sendLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            socket.emit('update-captain-location', {
              userId: captain._id,
              location: {
                ltd: latitude,
                lng: longitude,
              },
            });

            console.log('📡 Sent location:', latitude, longitude);
          },
          (err) => {
            console.warn('❌ Failed to get location:', err.message);
          }
        );
      } else {
        console.warn('❌ Geolocation is not supported');
      }
    };

    const intervalId = setInterval(sendLocation, 10000); // every 10s

    return () => clearInterval(intervalId);
  }, [socket, captain]);



  useEffect(() => {
    if (!socket || !captain?._id) return;

    const handleNewRide = (data) => {
      console.log('📦 New ride request:', data);
      setRideQueue((prev) => [...prev, data]); // Push into queue
      // console.log(rideQueue)
    };

    socket.on('ride-request', handleNewRide);
    console.log('📦 Listening for new ride requests');
    return () => {
      socket.off('ride-request', handleNewRide); // Clean up
    };
  }, [socket, captain]);

  // useEffect(() => {
  //   console.log('🧾 Updated ride queue:', rideQueue);
  // }, [rideQueue]);

  useEffect(() => {
    socket.on('remove-ride-from-queue', ({ rideId }) => {
      setRideQueue((prev) => prev.filter((ride) => ride._id !== rideId));
    });
  }, []);

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
          <CaptainDetails captain={captain} />
        </div>
        {rideQueue.length > 0 && (
          <div className='fixed inset-0 z-50 bg-white overflow-y-auto p-5'>
            <h2 className='text-xl font-semibold mb-4'>Incoming Ride Requests</h2>
            <div className='flex flex-col gap-4'>
              {rideQueue.map((ride, index) => (
                <RideCard
                  key={ride._id || index}
                  ride={ride}
                  setActiveRide={setActiveRide}
                  captainId={captain._id}
                  onAccept={async () => {
                    setConRidePopupPanel(true)
                    //cal /accept api with rideid and captain id post req
                    const token = localStorage.getItem('captain_token')
                    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/accept`, {
                      rideId: ride._id,
                      captainId: captain._id
                    }, {
                      headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                      }
                    });
                    if (response.status === 200) {
                      // console.log("ride...", response)
                      const ride = response.data.data
                      setActiveRide(ride)
                      console.log('ride accepted')
                    }
                    setRideQueue(prev => prev.filter((_, i) => i !== index))
                  }}
                  onIgnore={() => {
                    setRideQueue(prev => prev.filter((_, i) => i !== index))
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* <div ref={ridepopRef}
          className='translate-y-full fixed w-full z-40 bg-white bottom-0 px-3 py-8 pt-12'
        >
          <RidePopUp
            captainId={captain._id}
            ride={pendingRide}
            setRidePopupPanel={setRidePopupPanel}
            setConRidePopupPanel={setConRidePopupPanel}
          />
        </div> */}
        <div ref={conridepopRef}
          className='translate-y-full fixed w-full h-screen z-40 bg-white bottom-0 px-3 py-8 pt-12'
        >
          <ConRidePopUp
            ride={activeRide}
            setRidePopupPanel={setRidePopupPanel}
            setConRidePopupPanel={setConRidePopupPanel}
          />
        </div>
      </div>
    </>
  )
}

export default CaptainHome