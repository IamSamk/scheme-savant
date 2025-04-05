
import React from 'react';

// Since we can't directly modify NearbySchemes as it's in read-only files,
// we'll create a wrapper component that applies a z-index fix

const NearbySchemesFix: React.FC = () => {
  return (
    <div className="relative z-10">
      {/* This wrapper ensures the map doesn't overflow above the header */}
      <div className="nearby-schemes-wrapper">
        <style jsx>{`
          .nearby-schemes-wrapper :global(.leaflet-container) {
            z-index: 10 !important;
          }
        `}</style>
        <NearbySchemes />
      </div>
    </div>
  );
};

export default NearbySchemesFix;
