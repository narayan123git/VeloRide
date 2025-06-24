import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanelOpen, pickup, destination, setPickup, setDestination, focusedField, fetchFares }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [readyToContinue, setReadyToContinue] = useState(false);
  const debounceRef = useRef(null);

  const searchTerm = focusedField === 'pickup' ? pickup : destination;

  useEffect(() => {
    if (!searchTerm || searchTerm.length < 3) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { address: searchTerm },
          headers: { Authorization: `Bearer ${token}` }
        });

        const result = Array.isArray(res.data) ? res.data : [];
        setSuggestions(result);
      } catch (err) {
        console.error('Suggestion fetch failed:', err.message);
      }
    }, 1000); // debounce delay
  }, [searchTerm]);


  useEffect(() => {
    if (pickup && destination) {
      setReadyToContinue(true)
    } else {
      setReadyToContinue(false)
    }
  }, [pickup, destination])

  const handleSelect = (suggestion) => {
    if (focusedField === 'pickup') {
      setPickup(suggestion.display_name)
    } else {
      setDestination(suggestion.display_name)
    }
    setSuggestions([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleContinue = async () => {
    await fetchFares();
    setPanelOpen(false);
    setVehiclePanelOpen(true);
  };

  return (
    <div className='flex flex-col gap-4 p-4 bg-[#bb7ecf9b] rounded-lg shadow-lg max-h-[70%] overflow-y-auto'>
      {suggestions.map((s, idx) => (
        <div
          key={idx}
          onClick={() => handleSelect(s)}
          className='flex gap-4 items-center cursor-pointer active:border-2 px-3 py-2 rounded-lg active:border-black justify-start'
        >
          <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className='font-medium'>{s.display_name}</h4>
        </div>
      ))}

      {readyToContinue && (
        <button
          onClick={handleContinue}
          className="mt-4 bg-[#3f3f3f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition-all"
        >
          Continue
        </button>
      )}
    </div>
  )
}

export default LocationSearchPanel
