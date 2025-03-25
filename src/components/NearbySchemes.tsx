
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import { Navigation, MapPin, Target, LocateFixed } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Government scheme center locations
const schemeLocations = [
  { id: '1', name: 'PM Kisan Kendra', lat: 28.6139, lng: 77.2090, schemes: ['PM Kisan Samman Nidhi'] },
  { id: '2', name: 'MSME Development Center', lat: 28.5821, lng: 77.3266, schemes: ['Startup India Seed Fund', 'MSME Schemes'] },
  { id: '3', name: 'Education Scholarship Center', lat: 28.5494, lng: 77.2001, schemes: ['National Scholarship Portal'] },
  { id: '4', name: 'Housing Development Office', lat: 28.6304, lng: 77.2177, schemes: ['Pradhan Mantri Awas Yojana'] },
  { id: '5', name: 'NITI Aayog Innovation Hub', lat: 28.6129, lng: 77.2295, schemes: ['Atal Innovation Mission'] },
  { id: '6', name: 'Digital India Center', lat: 28.6508, lng: 77.2359, schemes: ['Digital India Scheme'] },
  { id: '7', name: 'Women Empowerment Center', lat: 28.5733, lng: 77.1673, schemes: ['Mahila Shakti Kendra Scheme'] },
];

// Location finder component that uses HTML5 geolocation
const LocationFinder: React.FC<{
  onLocationFound: (lat: number, lng: number) => void;
  setLoading: (loading: boolean) => void;
}> = ({ onLocationFound, setLoading }) => {
  const map = useMap();
  
  const getUserLocation = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.flyTo([latitude, longitude], 13);
          onLocationFound(latitude, longitude);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
          // Default to Delhi if location access is denied
          onLocationFound(28.6139, 77.2090);
        }
      );
    } else {
      console.log('Geolocation not available');
      setLoading(false);
      // Default to Delhi if geolocation is not supported
      onLocationFound(28.6139, 77.2090);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return null;
};

// Calculate distance between two points in km
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance;
};

const NearbySchemes: React.FC = () => {
  const { t } = useLanguage();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [nearestCenters, setNearestCenters] = useState<any[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Handle location found
  const handleLocationFound = (lat: number, lng: number) => {
    setUserLocation([lat, lng]);
    
    // Calculate distances to all centers
    const centersWithDistance = schemeLocations.map(center => {
      const distance = calculateDistance(lat, lng, center.lat, center.lng);
      return { ...center, distance };
    });
    
    // Sort by distance and take the 5 closest
    const closest = centersWithDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
    
    setNearestCenters(closest);
  };

  // Show routing when a center is selected
  const showRouting = (center: any) => {
    setSelectedCenter(center);
    
    if (mapRef.current && userLocation) {
      // Remove previous routing control if it exists
      if (routingControlRef.current) {
        mapRef.current.removeControl(routingControlRef.current);
      }
      
      // Create new routing control
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(userLocation[0], userLocation[1]),
          L.latLng(center.lat, center.lng)
        ],
        routeWhileDragging: true,
        showAlternatives: true,
        altLineOptions: {
          styles: [
            {color: 'black', opacity: 0.15, weight: 9},
            {color: 'white', opacity: 0.8, weight: 6},
            {color: 'blue', opacity: 0.5, weight: 2}
          ]
        }
      }).addTo(mapRef.current);
    }
  };

  // Clear routing
  const clearRouting = () => {
    setSelectedCenter(null);
    if (mapRef.current && routingControlRef.current) {
      mapRef.current.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }
  };

  // Store map reference when it's created
  const saveMapRef = (map: L.Map) => {
    mapRef.current = map;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="relative h-[500px] bg-muted rounded-lg overflow-hidden shadow-md border">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
                <div className="animate-pulse text-primary flex flex-col items-center gap-4">
                  <Target className="h-10 w-10 animate-ping" />
                  <p>{t("map.loading")}</p>
                </div>
              </div>
            )}
            
            <MapContainer 
              center={[28.6139, 77.2090]} 
              zoom={12} 
              style={{ height: "100%", width: "100%" }}
              whenCreated={saveMapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <LocationFinder 
                onLocationFound={handleLocationFound} 
                setLoading={setIsLoading}
              />
              
              {userLocation && (
                <Marker position={userLocation} icon={new L.Icon({
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41]
                })}>
                  <Popup>
                    <div className="font-medium">{t("map.yourLocation")}</div>
                  </Popup>
                </Marker>
              )}
              
              {nearestCenters.map(center => (
                <Marker 
                  key={center.id} 
                  position={[center.lat, center.lng]}
                  icon={new L.Icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                  })}
                >
                  <Popup>
                    <div>
                      <h3 className="font-medium text-sm">{center.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {center.distance.toFixed(2)} km {t("map.away")}
                      </p>
                      <div className="text-xs">
                        <strong>{t("map.availableSchemes")}:</strong>
                        <ul className="list-disc list-inside mt-1">
                          {center.schemes.map((scheme: string, idx: number) => (
                            <li key={idx}>{scheme}</li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full mt-2 text-xs h-7" 
                        onClick={() => showRouting(center)}
                      >
                        <Navigation className="h-3 w-3 mr-1" /> {t("map.getDirections")}
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
        
        <div className="w-full md:w-1/3 h-[500px] overflow-y-auto border rounded-lg shadow-md bg-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">{t("map.nearestCenters")}</h3>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[300px]">
              <LocateFixed className="h-8 w-8 text-primary animate-pulse mb-2" />
              <p className="text-muted-foreground">{t("map.findingCenters")}</p>
            </div>
          ) : nearestCenters.length > 0 ? (
            <div className="space-y-3">
              {nearestCenters.map(center => (
                <div 
                  key={center.id} 
                  className={`p-3 rounded-lg border transition-colors cursor-pointer hover:bg-accent ${
                    selectedCenter && selectedCenter.id === center.id ? 'border-primary/50 bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => showRouting(center)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{center.name}</h4>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {center.distance.toFixed(2)} km
                    </span>
                  </div>
                  
                  <div className="mt-1 text-xs text-muted-foreground">
                    <p className="mb-1"><strong>{t("map.availableSchemes")}:</strong></p>
                    <ul className="list-disc list-inside">
                      {center.schemes.map((scheme: string, idx: number) => (
                        <li key={idx}>{scheme}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-2 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        showRouting(center);
                      }}
                    >
                      <Navigation className="h-3 w-3 mr-1" /> {t("map.getDirections")}
                    </Button>
                  </div>
                </div>
              ))}
              
              {selectedCenter && (
                <div className="mt-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full" 
                    onClick={clearRouting}
                  >
                    {t("map.clearDirections")}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Alert>
              <AlertTitle>{t("map.noLocationsFound")}</AlertTitle>
              <AlertDescription>
                {t("map.enableLocation")}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default NearbySchemes;
