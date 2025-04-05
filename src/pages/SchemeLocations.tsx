
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import NearbySchemes from '@/components/NearbySchemes';
import { motion } from 'framer-motion';

const SchemeLocations: React.FC = () => {
  useEffect(() => {
    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <motion.div 
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="inline-flex items-center gap-2 justify-center mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MapPin className="text-primary animate-pulse-subtle" size={24} />
          <h1 className="text-3xl font-bold text-gradient">Scheme Centers Near You</h1>
        </motion.div>
        <motion.p 
          className="text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Find government scheme centers near your location and get directions to visit them. Our interactive map shows you the most convenient centers for your applications.
        </motion.p>
      </motion.div>

      <motion.div 
        className="mb-8 bg-card rounded-lg p-6 border shine"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Interactive Directions</h2>
            <p className="text-muted-foreground">
              Our map now features directions that show you the optimal route from your location to any scheme center.
            </p>
          </div>
          <Button className="whitespace-nowrap btn-hover-lift gradient-shift text-white">
            Allow Location Access
          </Button>
        </div>
      </motion.div>

      <NearbySchemes />
    </div>
  );
};

export default SchemeLocations;
