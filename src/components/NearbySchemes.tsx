
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

// This component would normally contain the actual map implementation
// We're creating a placeholder since we can't modify the original component
const NearbySchemes: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Find Scheme Centers Near You</h2>
        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <div className="h-[400px] bg-muted/50 rounded-lg flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary animate-pulse" />
              <span className="text-lg font-semibold">Interactive Map</span>
            </div>
            <p className="text-muted-foreground mb-6">Map visualization requires location permissions</p>
            <Button 
              variant="default" 
              className="flex items-center gap-2"
              onClick={() => alert("Location access requested. This would normally trigger the map to load.")}
            >
              <Navigation size={18} />
              Enable Location Access
            </Button>
          </div>
          
          <div className="mt-4">
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-md hover:bg-muted/80 transition-colors">
                <span className="font-medium">How to use the map</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-200"
                >
                  <path
                    d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                    fill="currentColor"
                  />
                </svg>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 text-sm text-muted-foreground">
                <ol className="list-decimal list-inside space-y-2">
                  <li>Allow location access when prompted</li>
                  <li>Browse the map to find nearest scheme centers</li>
                  <li>Click on pins to see details about each center</li>
                  <li>Use the "Get Directions" button to navigate there</li>
                </ol>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NearbySchemes;
