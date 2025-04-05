
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SchemeCard from "@/components/SchemeCard";
import { Lightbulb } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface SchemeResult {
  id: string;
  title: string;
  description: string;
  ministry: string;
  eligibility: string[];
  deadline?: string;
  location?: string;
  matchPercentage?: number;
  imageUrl?: string;
}

interface SchemesListProps {
  schemes: SchemeResult[];
}

const SchemesList: React.FC<SchemesListProps> = ({ schemes }) => {
  const [enhancedSchemes, setEnhancedSchemes] = useState<SchemeResult[]>([]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  useEffect(() => {
    const schemeImages = [
      "/scheme-images/agriculture.jpg",
      "/scheme-images/education.jpg",
      "/scheme-images/healthcare.jpg",
      "/scheme-images/housing.jpg",
      "/scheme-images/women-empowerment.jpg",
      "/scheme-images/startup.jpg",
      "/scheme-images/rural.jpg",
      "/scheme-images/digital.jpg"
    ];
    
    let updatedSchemes = schemes.map((scheme, index) => {
      if (scheme.imageUrl) {
        return scheme;
      }
      
      const ministryLower = scheme.ministry.toLowerCase();
      let imageUrl = "";
      
      if (ministryLower.includes("agri")) {
        imageUrl = "/scheme-images/agriculture.jpg";
      } else if (ministryLower.includes("education") || ministryLower.includes("skill")) {
        imageUrl = "/scheme-images/education.jpg";
      } else if (ministryLower.includes("health")) {
        imageUrl = "/scheme-images/healthcare.jpg";
      } else if (ministryLower.includes("housing") || ministryLower.includes("urban")) {
        imageUrl = "/scheme-images/housing.jpg";
      } else if (ministryLower.includes("women") || ministryLower.includes("child")) {
        imageUrl = "/scheme-images/women-empowerment.jpg";
      } else if (ministryLower.includes("startup") || ministryLower.includes("msme")) {
        imageUrl = "/scheme-images/startup.jpg";
      } else if (ministryLower.includes("rural")) {
        imageUrl = "/scheme-images/rural.jpg";
      } else if (ministryLower.includes("digital") || ministryLower.includes("it")) {
        imageUrl = "/scheme-images/digital.jpg";
      } else {
        imageUrl = schemeImages[index % schemeImages.length];
      }
      
      return { ...scheme, imageUrl };
    });
    
    setEnhancedSchemes(updatedSchemes);
  }, [schemes]);

  return (
    <div ref={ref}>
      {enhancedSchemes.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {enhancedSchemes.map((scheme) => (
            <motion.div
              key={scheme.id}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <SchemeCard {...scheme} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="col-span-3 text-center py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No schemes found</h3>
          <p className="mt-2 text-muted-foreground">
            There are currently no schemes available in this category. Please check back later or try another category.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SchemesList;
