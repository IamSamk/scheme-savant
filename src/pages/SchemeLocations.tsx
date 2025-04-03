
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import NearbySchemes from '@/components/NearbySchemes';

const SchemeLocations: React.FC = () => {
  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 justify-center mb-2">
          <MapPin className="text-primary" size={24} />
          <h1 className="text-3xl font-bold">Scheme Centers Near You</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find government scheme centers near your location and get directions to visit them. Our interactive map shows you the most convenient centers for your applications.
        </p>
      </div>

      <div className="mb-8 bg-card rounded-lg p-6 border">
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Interactive Directions</h2>
            <p className="text-muted-foreground">
              Our map now features directions that show you the optimal route from your location to any scheme center.
            </p>
          </div>
          <Button className="whitespace-nowrap">
            Allow Location Access
          </Button>
        </div>
      </div>

      <NearbySchemes />
    </div>
  );
};

export default SchemeLocations;
