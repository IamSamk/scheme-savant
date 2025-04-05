
import { useEffect, useState } from "react";
import { MotionDiv } from "@/assets/animations";
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
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {enhancedSchemes.length > 0 ? (
        enhancedSchemes.map((scheme, index) => (
          <MotionDiv
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
            }}
            className="h-full"
          >
            <SchemeCard {...scheme} />
          </MotionDiv>
        ))
      ) : (
        <div className="col-span-3 text-center py-10 animate-fade-in-up">
          <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No schemes found</h3>
          <p className="mt-2 text-muted-foreground">
            There are currently no schemes available in this category. Please check back later or try another category.
          </p>
        </div>
      )}
    </div>
  );
};

export default SchemesList;
