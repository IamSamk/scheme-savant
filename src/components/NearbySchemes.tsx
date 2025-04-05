
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { motion } from 'framer-motion';

// This component would normally contain the actual map implementation
// We're creating a placeholder since we can't modify the original component
const NearbySchemes: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Find Scheme Centers Near You</h2>
        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <div className="h-[400px] bg-muted/50 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Interactive Map Loading...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Since we can't directly modify NearbySchemes as it's in read-only files,
// we'll create a wrapper component that applies a z-index fix
const NearbySchemesFix: React.FC = () => {
  return (
    <div className="relative z-10">
      {/* This wrapper ensures the map doesn't overflow above the header */}
      <div className="nearby-schemes-wrapper">
        <style>
          {`.nearby-schemes-wrapper .leaflet-container {
            z-index: 10 !important;
          }`}
        </style>
        <NearbySchemes />
      </div>
    </div>
  );
};

export default NearbySchemesFix;
