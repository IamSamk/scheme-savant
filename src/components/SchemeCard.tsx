
import { ArrowRight, CheckCircle, User, Calendar, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";

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
  const [imgError, setImgError] = useState(false);
  
  // Default placeholder image
  const defaultImage = "/placeholder.svg";
  const displayImage = imgError ? defaultImage : (imageUrl || defaultImage);

  return (
    <motion.div
      className="rounded-xl overflow-hidden border border-border hover:border-primary/30 bg-card transition-all duration-300 group"
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        y: -5
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative overflow-hidden">
        <motion.img 
          src={displayImage} 
          alt={title} 
          className="w-full h-40 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          onError={() => setImgError(true)}
        />

        {matchPercentage && (
          <div className="absolute top-3 right-3 rounded-full glass-morphism px-3 py-1 text-xs font-semibold flex items-center gap-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
            {matchPercentage}% Match
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center flex-wrap gap-2 mb-2">
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

        <motion.h3 
          className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors"
          whileHover={{ x: 2 }}
        >
          {title}
        </motion.h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="mb-4">
          <div className="text-xs text-muted-foreground mb-2">Eligibility:</div>
          <div className="space-y-1.5">
            {eligibility.slice(0, 2).map((item, index) => (
              <motion.div 
                key={index} 
                className="flex items-start gap-2 text-xs"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1, x: 2 }}
              >
                <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </motion.div>
            ))}
            {eligibility.length > 2 && (
              <motion.div 
                className="text-xs text-primary/80"
                whileHover={{ x: 2 }}
              >
                +{eligibility.length - 2} more criteria
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          {location && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Map size={14} />
              <span>{location}</span>
            </div>
          )}
          
          <motion.div
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary hover:bg-primary/10"
            >
              View Details
              <motion.div
                className="ml-1"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
              >
                <ArrowRight size={14} />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SchemeCard;
