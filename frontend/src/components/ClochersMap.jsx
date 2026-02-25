import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom gold marker icon
const goldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Red marker for highlight
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ClochersMap = ({ clochers, height = "500px" }) => {
  // Calculate center of all churches
  const coordinates = Object.values(clochers).map(c => c.coordinates);
  const centerLat = coordinates.reduce((sum, c) => sum + c.lat, 0) / coordinates.length;
  const centerLng = coordinates.reduce((sum, c) => sum + c.lng, 0) / coordinates.length;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={11}
      style={{ height, width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.values(clochers).map((clocher, index) => (
        <Marker
          key={clocher.id}
          position={[clocher.coordinates.lat, clocher.coordinates.lng]}
          icon={redIcon}
        >
          <Popup>
            <div className="text-center min-w-[180px]">
              <img 
                src={clocher.image} 
                alt={clocher.churchName}
                className="w-full h-24 object-cover rounded-lg mb-2"
              />
              <h3 className="font-serif font-medium text-slate-800 text-sm mb-1">
                {clocher.churchName}
              </h3>
              <p className="text-slate-500 text-xs mb-2">{clocher.name}</p>
              <Link
                to={`/nos-clochers/${clocher.id}`}
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-1.5 rounded-full transition-colors"
              >
                Voir la fiche
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ClochersMap;
