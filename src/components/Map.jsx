import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix Leaflet Default Icon Issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

function FlyToLocation({ target }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 14, { duration: 1.5 });
    }
  }, [target, map]);
  return null;
}

export default function Map({ cameras, onSelect, selectedCamera }) {
  return (
    <MapContainer 
      center={[34.0522, -118.2437]} 
      zoom={11} 
      scrollWheelZoom={true} 
      className="w-full h-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <FlyToLocation target={selectedCamera} />
      {cameras.map((cam) => (
        <Marker 
          key={cam.id} 
          position={[cam.lat, cam.lng]}
          eventHandlers={{
            click: () => onSelect(cam),
          }}
        >
          <Popup className="custom-popup">
            <div className="text-slate-900 font-bold">{cam.title}</div>
            <div className="text-slate-600 text-xs">{cam.location}</div>
            <button 
              onClick={() => onSelect(cam)} 
              className="mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded w-full"
            >
              Watch Live
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}