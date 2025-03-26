
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import MentorCard from "./MentorCard";
import MentorSearchFilters from "./MentorSearchFilters";
import NoMentorsFound from "./NoMentorsFound";
import { 
  getAllMentors, 
  getAllSpecializations, 
  getAllLanguages,
  searchMentors
} from "@/services/mentorService";
import { Mentor } from "@/types/mentor";

const MentorDirectory: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>(getAllMentors());
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const specializations = getAllSpecializations();
  const languages = getAllLanguages();

  const handleSearch = () => {
    const filtered = searchMentors(searchTerm, selectedSpecialization, selectedLanguage);
    setFilteredMentors(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSpecialization(null);
    setSelectedLanguage(null);
    setFilteredMentors(getAllMentors());
  };

  const handleBookConsultation = (mentorId: string, mentorName: string) => {
    toast.success(`Consultation request sent to ${mentorName}`, {
      description: "You will receive a confirmation shortly",
    });
  };

  const handleDirectCall = (mentorPhone: string, mentorName: string) => {
    toast.success(`Initiating call to ${mentorName}`, {
      description: "Connecting you directly with the mentor",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">{t("mentors.title") || "Expert Mentors & Advisors"}</h2>
        <p className="text-muted-foreground mt-2">
          {t("mentors.subtitle") || "Connect with experienced professionals for personalized guidance"}
        </p>
      </div>
      
      <MentorSearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedSpecialization={selectedSpecialization}
        setSelectedSpecialization={setSelectedSpecialization}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        specializations={specializations}
        languages={languages}
        handleSearch={handleSearch}
        resetFilters={resetFilters}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.length > 0 ? (
          filteredMentors.map(mentor => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              onBookConsultation={handleBookConsultation}
              onDirectCall={handleDirectCall}
            />
          ))
        ) : (
          <NoMentorsFound resetFilters={resetFilters} />
        )}
      </div>
    </div>
  );
};

export default MentorDirectory;
