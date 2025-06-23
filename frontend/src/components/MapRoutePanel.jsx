import React from 'react'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const MapRoutePanel = ({ geometry }) => {
  if (!geometry || geometry.length === 0) return <div>No route found</div>
  // Convert [lon, lat] to [lat, lon] for leaflet
  const positions = geometry.map(([lon, lat]) => [lat, lon])
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden">
      <MapContainer center={positions[0]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={positions} color="blue" />
      </MapContainer>
    </div>
  )
}

export default MapRoutePanel