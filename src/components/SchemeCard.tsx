
import { ArrowRight, CheckCircle, User, Calendar, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SchemeCardProps {
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

const SchemeCard = ({
  id,
  title,
  description,
  ministry,
  eligibility,
  deadline,
  location,
  matchPercentage,
  imageUrl,
}: SchemeCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Generate a specific image based on ministry if no imageUrl is provided
  const getDefaultImage = () => {
    const ministryLower = ministry.toLowerCase();
    
    if (ministryLower.includes("agri")) {
      return "/scheme-images/agriculture.jpg";
    } else if (ministryLower.includes("education") || ministryLower.includes("skill")) {
      return "/scheme-images/education.jpg";
    } else if (ministryLower.includes("health")) {
      return "/scheme-images/healthcare.jpg";
    } else if (ministryLower.includes("housing") || ministryLower.includes("urban")) {
      return "/scheme-images/housing.jpg";
    } else if (ministryLower.includes("women") || ministryLower.includes("child")) {
      return "/scheme-images/women-empowerment.jpg";
    } else if (ministryLower.includes("startup") || ministryLower.includes("msme")) {
      return "/scheme-images/startup.jpg";
    } else if (ministryLower.includes("rural")) {
      return "/scheme-images/rural.jpg";
    } else if (ministryLower.includes("digital") || ministryLower.includes("it")) {
      return "/scheme-images/digital.jpg";
    } else {
      return "/scheme-images/default-scheme.jpg";
    }
  };

  useEffect(() => {
    // Only set image source once component mounts to prevent hydration issues
    const src = imageUrl || getDefaultImage();
    setImageSrc(src);
  }, [imageUrl, ministry]);

  const handleImageError = () => {
    setImageSrc("/scheme-images/default-scheme.jpg");
    setImageLoaded(true);
  };

  return (
    <motion.div 
      className="rounded-xl overflow-hidden border border-border hover:border-primary/30 bg-card transition-all duration-300 hover:shadow-lg group animate-scale-in card-hover h-full flex flex-col"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-40 bg-muted/30 overflow-hidden">
        {imageSrc && (
          <>
            {/* Show skeleton while image loads */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse"></div>
            )}
            <motion.img 
              src={imageSrc} 
              alt={title} 
              className={`w-full h-40 object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </>
        )}

        {matchPercentage && (
          <motion.div 
            className="absolute top-3 right-3 rounded-full glass-morphism px-2 py-1 text-xs font-semibold"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {matchPercentage}% Match
          </motion.div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {ministry}
          </Badge>
          
          {deadline && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Calendar size={12} />
              {deadline}
            </Badge>
          )}
        </div>

        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="mb-4">
          <div className="text-xs text-muted-foreground mb-2">Eligibility:</div>
          <div className="space-y-1">
            {eligibility.slice(0, 2).map((item, index) => (
              <div key={index} className="flex items-start gap-2 text-xs">
                <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
            {eligibility.length > 2 && (
              <div className="text-xs text-primary/80">+{eligibility.length - 2} more criteria</div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {location && (
              <div className="flex items-center gap-1">
                <Map size={14} />
                <span>{location}</span>
              </div>
            )}
          </div>
          
          <motion.div whileHover={{ x: 3 }}>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary hover:bg-primary/10 transition-transform btn-hover-lift"
            >
              View Details
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SchemeCard;
