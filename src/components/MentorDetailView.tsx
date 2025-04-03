
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMentorById } from "@/services/mentorService";
import { Mentor } from "@/types/mentor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Import the new components
import MentorProfile from "./mentor/MentorProfile";
import MentorActionButtons from "./mentor/MentorActionButtons";
import MentorDetailTabs from "./mentor/MentorDetailTabs";
import MentorDetailLoading from "./mentor/MentorDetailLoading";
import MentorNotFound from "./mentor/MentorNotFound";

const MentorDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const mentorData = getMentorById(id);
      setMentor(mentorData || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <MentorDetailLoading />;
  }

  if (!mentor) {
    return <MentorNotFound />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/mentors")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("mentors.back_to_directory") || "Back to Mentors"}
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Mentor info */}
        <div className="md:col-span-1">
          <MentorProfile mentor={mentor} />
          <MentorActionButtons
            mentorId={mentor.id}
            mentorName={mentor.name}
            mentorPhone={mentor.phone}
          />
        </div>

        {/* Right column - Detailed content */}
        <div className="md:col-span-2">
          <MentorDetailTabs mentor={mentor} />
        </div>
      </div>
    </div>
  );
};

export default MentorDetailView;
