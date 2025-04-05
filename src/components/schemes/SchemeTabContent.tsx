
import React from 'react';
import { motion } from 'framer-motion';
import SchemeCard from '@/components/SchemeCard';
import { SchemeRecommendation } from '@/data/recommendations';

interface SchemeTabContentProps {
  schemes: SchemeRecommendation[];
}

const SchemeTabContent: React.FC<SchemeTabContentProps> = ({ schemes }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {schemes.map((scheme) => (
        <motion.div key={scheme.id} variants={item} className="h-full">
          <SchemeCard {...scheme} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SchemeTabContent;
