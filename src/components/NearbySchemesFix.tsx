
import React from 'react';
import NearbySchemes from './NearbySchemes';
import './styles/mapStyles.css';

const NearbySchemesFix: React.FC = () => {
  return (
    <div className="relative z-10">
      <div className="nearby-schemes-wrapper">
        <NearbySchemes />
      </div>
    </div>
  );
};

export default NearbySchemesFix;
