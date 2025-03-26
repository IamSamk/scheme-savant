
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MessageCircle, Phone, Star, User, Video } from "lucide-react";
import { Mentor } from "@/types/mentor";
import { useLanguage } from "@/contexts/LanguageContext";

interface MentorCardProps {
  mentor: Mentor;
  onBookConsultation: (mentorId: string, mentorName: string) => void;
  onDirectCall: (mentorPhone: string, mentorName: string) => void;
}

const MentorCard: React.FC<MentorCardProps> = ({ 
  mentor, 
  onBookConsultation, 
  onDirectCall 
}) => {
  const { t } = useLanguage();

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
          />
        ))}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden bg-secondary">
            <img 
              src={mentor.avatar} 
              alt={mentor.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{mentor.name}</h3>
            <div className="mt-1">{renderRating(mentor.rating)}</div>
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <User size={14} />
              <span>{mentor.experience} years exp.</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-1 mb-2">
            {mentor.specialization.map(spec => (
              <Badge key={spec} variant="secondary" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            {mentor.description}
          </p>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <Calendar size={12} className="shrink-0" />
            <span>{mentor.availability.join(" • ")}</span>
          </div>
          
          <div className="mt-2">
            <h4 className="text-xs font-medium mb-1">{t("mentors.languages") || "Languages"}</h4>
            <div className="flex flex-wrap gap-1">
              {mentor.languages.map(lang => (
                <Badge key={lang} variant="outline" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col gap-2">
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => onBookConsultation(mentor.id, mentor.name)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {t("mentors.book_consultation") || "Book Consultation"}
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <MessageCircle className="mr-2 h-4 w-4" />
              {t("mentors.chat") || "Chat"}
            </Button>
            <Button variant="outline" className="flex-1">
              <Video className="mr-2 h-4 w-4" />
              {t("mentors.video") || "Video"}
            </Button>
          </div>
          
          <a 
            href={`tel:${mentor.phone}`}
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              onDirectCall(mentor.phone || "", mentor.name);
              window.location.href = `tel:${mentor.phone}`;
            }}
          >
            <Button variant="secondary" className="w-full">
              <Phone className="mr-2 h-4 w-4" />
              {t("mentors.call") || "Call Mentor"}
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
};

export default MentorCard;
