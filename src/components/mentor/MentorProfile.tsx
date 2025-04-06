
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Star } from "lucide-react";
import { Mentor } from "@/types/mentor";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MentorProfileProps {
  mentor: Mentor;
}

const MentorProfile: React.FC<MentorProfileProps> = ({ mentor }) => {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);
  
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
          />
        ))}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Use placeholder avatar
  const defaultAvatar = "/placeholder.svg";
  const displayAvatar = imgError ? defaultAvatar : (mentor.avatar || defaultAvatar);

  return (
    <motion.div 
      className="bg-card rounded-lg p-6 shadow-sm mb-6 border border-transparent hover:border-primary/20 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex flex-col items-center text-center mb-6">
        <motion.div 
          className="h-32 w-32 rounded-full overflow-hidden bg-secondary mb-4 border-2 border-transparent hover:border-primary/30 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <Avatar className="h-full w-full">
            <AvatarImage 
              src={displayAvatar} 
              alt={mentor.name}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
            <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </motion.div>
        <h1 className="text-2xl font-bold mb-1 text-foreground">{mentor.name}</h1>
        <div className="mb-2">{renderRating(mentor.rating)}</div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <User size={14} />
          <span>{mentor.experience} years experience</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Expertise</h3>
          <div className="flex flex-wrap gap-1">
            {mentor.specialization.map(spec => (
              <Badge 
                key={spec} 
                variant="secondary"
                className="transition-all duration-300 hover:bg-primary/20 cursor-pointer"
              >
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Languages</h3>
          <div className="flex flex-wrap gap-1">
            {mentor.languages.map(lang => (
              <Badge 
                key={lang} 
                variant="outline"
                className="transition-colors duration-300 hover:bg-secondary cursor-pointer"
              >
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Availability</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground group">
            <Calendar size={14} className="shrink-0 group-hover:text-primary transition-colors duration-300" />
            <span>{mentor.availability.join(" • ")}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MentorProfile;
