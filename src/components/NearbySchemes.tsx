
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useLanguage } from '@/contexts/LanguageContext';
import 'leaflet/dist/leaflet.css';
import { Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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

// Define an interface for scheme centers
interface SchemeCenter {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance?: number; // Optional distance property that will be calculated
}

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

const destinationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// DirectionsManager component to handle route display
interface DirectionsManagerProps {
  from: [number, number];
  to: [number, number] | null;
}

const DirectionsManager: React.FC<DirectionsManagerProps> = ({ from, to }) => {
  const map = useMap();
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!to) {
      setRoutePoints([]);
      return;
    }

    const fetchRoute = async () => {
      setIsLoading(true);
      try {
        // API call to OSRM (Open Source Routing Machine)
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        
        if (data.routes && data.routes.length > 0) {
          // OSRM returns coordinates as [lng, lat], but we need [lat, lng] for Leaflet
          const coordinates = data.routes[0].geometry.coordinates.map(
            (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
          );
          
          setRoutePoints(coordinates);
          
          // Fit map to show the entire route
          const bounds = L.latLngBounds(coordinates);
          map.fitBounds(bounds, { padding: [50, 50] });
          
          toast.success("Route calculated successfully!");
        } else {
          toast.error("Couldn't find a route between these locations");
        }
      } catch (error) {
        console.error("Error fetching route:", error);
        toast.error("Failed to calculate route");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoute();
  }, [from, to, map]);

  return (
    <>
      {isLoading && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-[1000] bg-primary text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
          Calculating route...
        </div>
      )}
      {routePoints.length > 0 && (
        <Polyline 
          positions={routePoints} 
          color="#3388ff" 
          weight={6} 
          opacity={0.8} 
          lineJoin="round"
          dashArray="1, 10"
          dashOffset="0"
        />
      )}
    </>
  );
};

// Component to set view to current user location
const LocationMarker: React.FC<{ 
  setCenterLocation: (pos: [number, number]) => void,
}> = ({ setCenterLocation }) => {
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
    <Marker position={position} icon={userIcon}>
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
  const [sortedCenters, setSortedCenters] = useState<SchemeCenter[]>(schemeCenters);
  const [selectedCenter, setSelectedCenter] = useState<[number, number] | null>(null);
  const [mapRef, setMapRef] = useState<L.Map | null>(null);

  // Sort centers by distance from user
  useEffect(() => {
    if (userLocation) {
      const centersWithDistance = schemeCenters.map(center => ({
        ...center,
        distance: calculateDistance(userLocation[0], userLocation[1], center.lat, center.lng)
      }));
      
      const sorted = [...centersWithDistance].sort((a, b) => a.distance! - b.distance!);
      setSortedCenters(sorted);
    }
  }, [userLocation]);

  const handleShowDirections = (center: SchemeCenter) => {
    setSelectedCenter([center.lat, center.lng]);
    
    // If we have a map reference, fly to the center to highlight it
    if (mapRef) {
      mapRef.flyTo([center.lat, center.lng], 10, {
        animate: true,
        duration: 1
      });
    }
    
    toast.info(`Showing route to ${center.name}`);
  };

  const handleClearRoute = () => {
    setSelectedCenter(null);
    
    // Reset view to show all markers
    if (mapRef && userLocation) {
      mapRef.setView(userLocation, 5);
    }
  };

  return (
    <section className="py-16 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            {t("map.badge")}
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gradient">{t("map.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("map.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 rounded-lg overflow-hidden shadow-lg border border-border relative animate-fade-in-left">
            <div className="h-[500px] w-full z-10 relative"> {/* Added z-10 to ensure map stays behind header */}
              <MapContainer 
                style={{ height: "100%", width: "100%" }} 
                zoom={5} 
                scrollWheelZoom={true}
                ref={(ref) => {
                  if (ref) setMapRef(ref);
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker setCenterLocation={setUserLocation} />
                
                {sortedCenters.map(center => (
                  <Marker 
                    key={center.id} 
                    position={[center.lat, center.lng]}
                    icon={selectedCenter && selectedCenter[0] === center.lat && selectedCenter[1] === center.lng ? destinationIcon : defaultIcon}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-bold">{center.name}</h3>
                        <p>{center.address}</p>
                        {center.distance !== undefined && (
                          <p className="text-sm text-muted-foreground">
                            {t("map.distance")}: {Math.round(center.distance * 10) / 10} km
                          </p>
                        )}
                        <Button 
                          size="sm" 
                          className="mt-2 w-full flex items-center justify-center gap-1 btn-hover-lift" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowDirections(center);
                          }}
                        >
                          <Route size={14} />
                          Show Directions
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                
                {selectedCenter && userLocation && (
                  <DirectionsManager from={userLocation} to={selectedCenter} />
                )}
              </MapContainer>
            </div>
            
            {selectedCenter && (
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-2 right-2 z-[20] bg-white text-primary border-primary/30 hover:bg-primary/10 btn-hover-glow"
                onClick={handleClearRoute}
              >
                Clear Route
              </Button>
            )}
          </div>
          
          <div className="bg-card rounded-lg p-6 border border-border shadow-sm card-hover animate-fade-in-right">
            <h3 className="text-xl font-bold mb-4 text-gradient">{t("map.nearestCenters")}</h3>
            <div className="space-y-4 stagger-children">
              {sortedCenters.slice(0, 3).map(center => (
                <div key={center.id} className="p-4 rounded-lg border border-border hover:border-primary/30 transition-all shine">
                  <h4 className="font-semibold">{center.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{center.address}</p>
                  {center.distance !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {Math.round(center.distance * 10) / 10} km {t("map.away")}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1 text-primary btn-hover-expand" 
                        onClick={() => handleShowDirections(center)}
                      >
                        <Route size={14} />
                        Show Directions
                      </Button>
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
