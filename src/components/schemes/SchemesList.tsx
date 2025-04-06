
import { useEffect, useState } from "react";
import { MotionDiv } from "@/assets/animations";
import SchemeCard from "@/components/SchemeCard";
import { Lightbulb } from "lucide-react";

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

  useEffect(() => {
    // Map categories to images
    const categoryToImage = {
      "Agriculture": "/placeholder.svg",
      "Education": "/placeholder.svg",
      "Healthcare": "/placeholder.svg",
      "Health": "/placeholder.svg",
      "Commerce & Industry": "/placeholder.svg",
      "Housing & Urban Affairs": "/placeholder.svg",
      "NITI Aayog": "/placeholder.svg",
      "Electronics & IT": "/placeholder.svg",
      "Finance": "/placeholder.svg",
      "Skill Development": "/placeholder.svg",
      "MSME": "/placeholder.svg",
      "Food Processing Industries": "/placeholder.svg",
    };
    
    // Use category-based images
    const updatedSchemes = schemes.map((scheme) => {
      // Use category-based image or fallback to default placeholder
      const imageUrl = categoryToImage[scheme.ministry] || "/placeholder.svg";
      
      return { ...scheme, imageUrl };
    });
    
    setEnhancedSchemes(updatedSchemes);
  }, [schemes]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {enhancedSchemes.length > 0 ? (
        enhancedSchemes.map((scheme, index) => (
          <MotionDiv
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
            }}
          >
            <SchemeCard {...scheme} />
          </MotionDiv>
        ))
      ) : (
        <div className="col-span-3 text-center py-10">
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
