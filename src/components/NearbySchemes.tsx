
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useLanguage } from '@/contexts/LanguageContext';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Sample government scheme centers data
const schemeCenters = [
  { id: '1', name: 'Delhi Scheme Center', address: 'Connaught Place, New Delhi', lat: 28.6304, lng: 77.2177 },
  { id: '2', name: 'Mumbai Scheme Center', address: 'Andheri, Mumbai', lat: 19.1136, lng: 72.8697 },
  { id: '3', name: 'Bangalore Scheme Center', address: 'MG Road, Bangalore', lat: 12.9716, lng: 77.5946 },
  { id: '4', name: 'Chennai Scheme Center', address: 'T Nagar, Chennai', lat: 13.0827, lng: 80.2707 },
  { id: '5', name: 'Kolkata Scheme Center', address: 'Park Street, Kolkata', lat: 22.5726, lng: 88.3639 },
];

// Custom marker icons
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to set view to current user location
const LocationMarker: React.FC<{ setCenterLocation: (pos: [number, number]) => void }> = ({ setCenterLocation }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 10 });
    
    map.on('locationfound', (e) => {
      const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(coords);
      setCenterLocation(coords);
    });
    
    map.on('locationerror', () => {
      console.log('Location access denied or unavailable');
      // Default to center of India if location not available
      const defaultPos: [number, number] = [20.5937, 78.9629];
      setPosition(defaultPos);
      setCenterLocation(defaultPos);
      map.setView(defaultPos, 5);
    });
  }, [map, setCenterLocation]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

// Calculate distance between two points in kilometers using the Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
};

const NearbySchemes: React.FC = () => {
  const { t } = useLanguage();
  const [userLocation, setUserLocation] = useState<[number, number]>([20.5937, 78.9629]); // Default center of India
  const [sortedCenters, setSortedCenters] = useState(schemeCenters);

  // Sort centers by distance from user
  useEffect(() => {
    if (userLocation) {
      const centersWithDistance = schemeCenters.map(center => ({
        ...center,
        distance: calculateDistance(userLocation[0], userLocation[1], center.lat, center.lng)
      }));
      
      const sorted = [...centersWithDistance].sort((a, b) => a.distance - b.distance);
      setSortedCenters(sorted);
    }
  }, [userLocation]);

  return (
    <section className="py-16 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            {t("map.badge")}
          </div>
          <h2 className="text-3xl font-bold mb-4">{t("map.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("map.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 rounded-lg overflow-hidden shadow-lg border border-border">
            <MapContainer 
              style={{ height: "500px", width: "100%" }} 
              zoom={5} 
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker setCenterLocation={setUserLocation} />
              
              {sortedCenters.map(center => (
                <Marker 
                  key={center.id} 
                  position={[center.lat, center.lng]}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{center.name}</h3>
                      <p>{center.address}</p>
                      {center.distance && (
                        <p className="text-sm text-muted-foreground">
                          {t("map.distance")}: {Math.round(center.distance * 10) / 10} km
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          
          <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
            <h3 className="text-xl font-bold mb-4">{t("map.nearestCenters")}</h3>
            <div className="space-y-4">
              {sortedCenters.slice(0, 3).map(center => (
                <div key={center.id} className="p-4 rounded-lg border border-border hover:border-primary/30 transition-all">
                  <h4 className="font-semibold">{center.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{center.address}</p>
                  {center.distance && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {Math.round(center.distance * 10) / 10} km {t("map.away")}
                      </span>
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline"
                      >
                        {t("map.getDirections")}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NearbySchemes;
