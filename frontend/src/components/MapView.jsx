import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ center, markers }) => (
  <MapContainer center={center} zoom={13} style={{ height: "400px", width: "100%" }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    {markers.map((pos, idx) => (
      <Marker key={idx} position={pos}>
        <Popup>Marker {idx + 1}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default MapView;