
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Video, Phone } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface MentorActionButtonsProps {
  mentorId: string;
  mentorName: string;
  mentorPhone?: string;
}

const MentorActionButtons: React.FC<MentorActionButtonsProps> = ({ 
  mentorId, 
  mentorName, 
  mentorPhone 
}) => {
  const { t } = useLanguage();
  
  const handleBookConsultation = () => {
    toast.success(`Consultation request sent to ${mentorName}`, {
      description: "You will receive a confirmation shortly",
    });
  };

  const handleDirectCall = () => {
    if (mentorPhone) {
      toast.success(`Initiating call to ${mentorName}`, {
        description: "Connecting you directly with the mentor",
      });
      window.location.href = `tel:${mentorPhone}`;
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-3">
      <Button 
        variant="default" 
        className="w-full"
        onClick={handleBookConsultation}
      >
        <Calendar className="mr-2 h-4 w-4" />
        {t("mentors.book_consultation") || "Book Consultation"}
      </Button>
      
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline">
          <MessageCircle className="mr-2 h-4 w-4" />
          {t("mentors.chat") || "Chat"}
        </Button>
        <Button variant="outline">
          <Video className="mr-2 h-4 w-4" />
          {t("mentors.video") || "Video"}
        </Button>
      </div>
      
      <Button 
        variant="secondary" 
        className="w-full"
        onClick={handleDirectCall}
        disabled={!mentorPhone}
      >
        <Phone className="mr-2 h-4 w-4" />
        {t("mentors.call") || "Call Mentor"}
      </Button>
    </div>
  );
};

export default MentorActionButtons;
