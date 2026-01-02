import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useEffect } from 'react';

// Fix for default Leaflet markers in React
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIcon2xPng from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new Icon({
  iconUrl: markerIconPng,
  iconRetinaUrl: markerIcon2xPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapController({ selectedCamera }) {
  const map = useMap();
  useEffect(() => {
    if (selectedCamera) {
      map.flyTo([selectedCamera.lat, selectedCamera.lng], 14, {
        animate: true,
        duration: 1.5
      });
    }
  }, [selectedCamera, map]);
  return null;
}

export default function MapComponent({ cameras, onSelect, selectedCamera }) {
  return (
    <MapContainer 
      center={[34.0522, -118.2437]} 
      zoom={10} 
      scrollWheelZoom={true} 
      className="w-full h-full z-0"
    >
      {/* Dark Mode Map Tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      <MapController selectedCamera={selectedCamera} />

      {cameras.map((cam) => (
        <Marker 
          key={cam.id} 
          position={[cam.lat, cam.lng]} 
          icon={customIcon}
          eventHandlers={{
            click: () => onSelect(cam),
          }}
        >
          <Popup className="custom-popup">
            <div className="text-slate-900">
              <h3 className="font-bold">{cam.title}</h3>
              <p className="text-xs">{cam.location}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}