
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Star } from "lucide-react";
import { Mentor } from "@/types/mentor";
import { useLanguage } from "@/contexts/LanguageContext";

interface MentorProfileProps {
  mentor: Mentor;
}

const MentorProfile: React.FC<MentorProfileProps> = ({ mentor }) => {
  const { t } = useLanguage();
  
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

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="h-32 w-32 rounded-full overflow-hidden bg-secondary mb-4">
          <img 
            src={mentor.avatar} 
            alt={mentor.name}
            className="h-full w-full object-cover"
          />
        </div>
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
              <Badge key={spec} variant="secondary">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Languages</h3>
          <div className="flex flex-wrap gap-1">
            {mentor.languages.map(lang => (
              <Badge key={lang} variant="outline">
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Availability</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar size={14} className="shrink-0" />
            <span>{mentor.availability.join(" • ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
